// set the dimensions and margins of the graph
var width = 454;
var height = 465;

var color = d3.scaleOrdinal(d3.schemeCategory10);

var isTooltipHidden = true;

// append the svg object to the body of the page
var svg = d3.select(".bottom-container")
.append("svg")
  .attr("width", width)
  .attr("height", height)

var url = "https://louislugas.github.io/covid_19_cluster/json/kasus-corona-indonesia.json";

var g = svg.append("g")
.attr("class", "everything");

//add zoom capabilities
var zoom_handler = d3.zoom()
    .on("zoom", zoom_actions);

zoom_handler(svg);

console.log(url);

var x = d3.scaleOrdinal()
  .domain([1, 2, 3, 4, 5, 6])
  .range([20, 70, 120, 170, 220, 270])

//test url
//d3.json(url).then(function(data) {
//    console.log(data.links);
//    console.log(data.nodes);
//    console.log(data);
//});

startViz()
//START VIS
function startViz() {
d3.json(url).then(function(data) {

  var link = g
    .append("g")
    .selectAll("line")
    .data(data.links)
    .enter()
    .append("line")
      .attr("class",".link")
      .style("stroke", "white")
      .style("stroke-width", 2);

// Initialize the circle: all located at the center of the svg area
  var node = g
    .append("g")
    .selectAll("circle")
    .data(data.nodes)
    .enter()
    .append("circle")
      .attr("class",".node")
      .attr("r", 18)
      .style("stroke", "#262626")
      .style("stroke-width", 3)
      .style("fill", function(d) {return color(d.klasterid);})
      .on("click", clickNode)
      .call(drag(simulation));

  var idText = g
    .append("g")
    .selectAll("text")
    .data(data.nodes)
    .enter()
    .append("text")
      .attr("class",".text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .text(function(d) { return d.id })
      .style("font-family","Lato")
      .style("font-size", 16)
      .style("fill","white")
      .on("click", clickNode);


  svg.call(drag(simulation));

  var simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink()// This force provides links between nodes
      .id(function(d) { return d.id; })// This provide  the id of a node
      .links(data.links)// and this the list of links
        )
    .force("center", d3.forceCenter().x(width/2).y(height/2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(0.5)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(0.01).radius(45).iterations(1)); // Force that avoids circle overlapping

// Apply these forces to the nodes and update their positions.
// Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
simulation
    .nodes(data.nodes)
    .on("tick", function(d){
      node
        .attr("cx", function(d){ return d.x; })
        .attr("cy", function(d){ return d.y; })
        .call(drag(simulation))
      idText
        .attr("x", function(d){ return d.x; })
        .attr("y", function(d){ return d.y; })
        .call(drag(simulation))
      link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
    });

});
};


drag = simulation => {

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.01).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}

function zoom_actions(){
    g.attr("transform", d3.event.transform)
}


//TOOLTIP
function clickNode(node) {
       // update visibility
       isTooltipHidden = !isTooltipHidden;
       var visibility = (isTooltipHidden) ? "hidden" : "visible";

       // load tooltip content (if it changes based on node)
       loadTooltipContent(node);

       if (isTooltipHidden) {
         unPinNode(node);
       }

       // place tooltip where cursor was
       return tooltip.style("visibility", visibility);
  }

  // reset nodes to not be pinned
  function unPinNode(node) {
     node.fx = null;
     node.fy = null;
  }

  // add html content to tooltip
  function loadTooltipContent(node) {
      var htmlContent = "<div>";
      htmlContent += "<h4>Kasus #" + node.id + "<\/h4>"
      htmlContent += "<table>"
      htmlContent += "<tr><td width=\"40%\">Jenis Kelamin: <\/td> <td><strong>" + node.gender +"<\/strong><\/td><\/tr>"
      htmlContent += "<tr><td width=\"40%\">Umur: <\/td> <td><strong>" + node.umurtext +"<\/strong><\/td><\/tr>"
      htmlContent += "<tr><td width=\"40%\">Tanggal Pengumuman: <\/td> <td><strong>" + node.pengumuman +"<\/strong><\/td><\/tr>"
      htmlContent += "<tr><td width=\"40%\">Asal Penularan: <\/td> <td><strong>" + node.penularan +"<\/strong><\/td><\/tr>"
      htmlContent += "<tr><td width=\"40%\">Klaster <\/td> <td><strong>" + node.klaster +"<\/strong><\/td><\/tr>"
      tooltip.html(htmlContent);
  }

  // add tooltip to HTML body
  var tooltip = d3.select(".middle-container")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("padding", "4px")
    .style("z-index", "10")
    .style("width", "445px")
    .style("height", "180px")
    .style("margin", "auto")
    .style("background-color", "rgba(255, 255, 255, 0.8)")
    .style("visibility", "hidden")
    .style("font-family", "Lato")
    .text("");
