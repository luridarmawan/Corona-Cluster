var width = 454,
		height = 465;

var svg = d3.select(".bottom-container")
	.append("svg")
		.attr("width", width)
		.attr("height", height);

var g = svg.append("g")
.attr("class", "everything");

//tooltip status
var isTooltipHidden = true;

//svg object
var link, node, idText;

//scale by category
var groupCluster = d3.scaleOrdinal()
  .domain([1, 2, 3, 4, 5, 6])
  .range([20, 70, 120, 170, 220, 270])

//data--object with node and links
var graph;

//add zoom capabilities
var zoom_handler = d3.zoom()
    .on("zoom", zoom_actions);

zoom_handler(svg);

var radioValue;

//data url
var url = "https://louislugas.github.io/covid_19_cluster/json/kasus-corona-indonesia.json";

////////////////////////////////////////////////////////////////////////////////////////////////////
//UPDATE FORCE NORMAL
////////////////////////////////////////////////////////////////////////////////////////////////////

function forceNormal() {
	simulation.force("center")
		.x(width * forceProperties.center.x)
		.y(height * forceProperties.center.y);
	simulation.force("charge")
		.strength(forceProperties.charge.strength * forceProperties.charge.enabled)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);
	simulation.force("collide")
		.strength(forceProperties.collide.strength * forceProperties.charge.enabled)
		.radius(forceProperties.collide.radius)
		.iterations(forceProperties.collide.iterations);
	simulation.force("forceY")
		.strength(forceProperties.forceY.strength * forceProperties.forceY.enabled)
		.y(height * forceProperties.forceY.y);
	simulation.force("forceX")
		.strength(forceProperties.forceX.strength * forceProperties.forceX.enabled)
		.x(width * forceProperties.forceX.x);
	simulation.force("link")
		.id(function(d) { return d.id ;})
		.distance(forceProperties.link.distance)
		.iterations(forceProperties.link.iterations)
		.links(forceProperties.link.enabled ? graph.links : []);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
//UPDATE FORCE BY GROUPING
////////////////////////////////////////////////////////////////////////////////////////////////////
//GROUP BY CLUSTER
////////////////////////////////////////////////////////////////////////////////////////////////////

function forceCluster() {

	//width divider
	var div = Math.max.apply(Math,graph.nodes.map(function(d){return d.klasterid;}));
	console.log(div);
	console.log(width);
	var scale = width/div/1.5;
	console.log(scale);
	var arrdomain = Array.from(Array(div), (value, index) => (index+1));
	var arrrange = Array.from(Array(div), (value, index) => ((index+1)*scale));
	console.log(arrrange);
	console.log(arrdomain);

	var scaleCat = d3.scaleOrdinal()
	  .domain(arrdomain)
	  .range(arrrange)

	simulation.force("center")
		.x(width * forceProperties.center.x+20)
		.y(height * forceProperties.center.y);
	simulation.force("charge")
		.strength(-150)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);
	simulation.force("collide")
		.strength(forceProperties.collide.strength * forceProperties.charge.enabled)
		.radius(forceProperties.collide.radius)
		.iterations(forceProperties.collide.iterations);
	simulation.force("forceY")
		.strength(0.5)
		.y(height * forceProperties.forceY.y);
	simulation.force("forceX")
		.strength(0.9)
		.x(function(d){ return scaleCat(d.klasterid) } );
	simulation.force("link")
		.id(function(d) { return d.id ;})
		.distance(forceProperties.link.distance)
		.strength(0.01)
		.iterations(forceProperties.link.iterations)
		.links(forceProperties.link.enabled ? graph.links : []);

}

////////////////////////////////////////////////////////////////////////////////////////////////////
//GROUP BY AGE
////////////////////////////////////////////////////////////////////////////////////////////////////

function forceAge() {

	//width divider
	var div = Math.max.apply(Math,graph.nodes.map(function(d){return d.umur;}));
	console.log(div);
	console.log(width);
	var scale = width/div/1.5;
	console.log(scale);
	var arrdomain = Array.from(Array(9), (value, index) => (index+1));
	var arrrange = Array.from(Array(div), (value, index) => ((index+1)*scale));
	console.log(arrrange);
	console.log(arrdomain);

	var scaleCat = d3.scaleOrdinal()
	  .domain(arrdomain)
	  .range(arrrange)

	simulation.force("center")
		.x(width * forceProperties.center.x+20)
		.y(height * forceProperties.center.y);
	simulation.force("charge")
		.strength(-150)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);
	simulation.force("collide")
		.strength(forceProperties.collide.strength * forceProperties.charge.enabled)
		.radius(forceProperties.collide.radius)
		.iterations(forceProperties.collide.iterations);
	simulation.force("forceY")
		.strength(0.5)
		.y(height * forceProperties.forceY.y);
	simulation.force("forceX")
		.strength(0.9)
		.x(function(d){ return scaleCat(d.umur) } );
	simulation.force("link")
		.id(function(d) { return d.id ;})
		.distance(forceProperties.link.distance)
		.strength(0.01)
		.iterations(forceProperties.link.iterations)
		.links(forceProperties.link.enabled ? graph.links : []);

}

////////////////////////////////////////////////////////////////////////////////////////////////////
//GROUP BY GENDER
////////////////////////////////////////////////////////////////////////////////////////////////////

function forceGender() {

	//width divider
	var div = Math.max.apply(Math,graph.nodes.map(function(d){return d.genderid;}));
	console.log(div);
	console.log(width);
	var scale = width/div/1.5;
	console.log(scale);
	var arrdomain = Array.from(Array(div), (value, index) => (index+1));
	var arrrange = Array.from(Array(div), (value, index) => ((index+1)*scale));
	console.log(arrrange);
	console.log(arrdomain);

	var scaleCat = d3.scaleOrdinal()
	  .domain(arrdomain)
	  .range(arrrange)

	simulation.force("center")
		.x(width * forceProperties.center.x-50)
		.y(height * forceProperties.center.y);
	simulation.force("charge")
		.strength(-150)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);
	simulation.force("collide")
		.strength(forceProperties.collide.strength * forceProperties.charge.enabled)
		.radius(forceProperties.collide.radius)
		.iterations(forceProperties.collide.iterations);
	simulation.force("forceY")
		.strength(0.5)
		.y(height * forceProperties.forceY.y);
	simulation.force("forceX")
		.strength(0.7)
		.x(function(d){ return scaleCat(d.genderid) } );
	simulation.force("link")
		.id(function(d) { return d.id ;})
		.distance(forceProperties.link.distance)
		.strength(0.01)
		.iterations(forceProperties.link.iterations)
		.links(forceProperties.link.enabled ? graph.links : []);

}

////////////////////////////////////////////////////////////////////////////////////////////////////
//GROUP BY STATUS
////////////////////////////////////////////////////////////////////////////////////////////////////

function forceStatus() {

	//width divider
	var div = Math.max.apply(Math,graph.nodes.map(function(d){return d.statusid;}));
	console.log(div);
	console.log(width);
	var scale = width/div/1.5;
	console.log(scale);
	var arrdomain = Array.from(Array(div), (value, index) => (index+1));
	var arrrange = Array.from(Array(div), (value, index) => ((index+1)*scale));
	console.log(arrrange);
	console.log(arrdomain);

	var scaleCat = d3.scaleOrdinal()
	  .domain(arrdomain)
	  .range(arrrange)

	simulation.force("center")
		.x(width * forceProperties.center.x-5)
		.y(height * forceProperties.center.y);
	simulation.force("charge")
		.strength(-150)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);
	simulation.force("collide")
		.strength(forceProperties.collide.strength * forceProperties.charge.enabled)
		.radius(forceProperties.collide.radius)
		.iterations(forceProperties.collide.iterations);
	simulation.force("forceY")
		.strength(0.5)
		.y(height * forceProperties.forceY.y);
	simulation.force("forceX")
		.strength(0.7)
		.x(function(d){ return scaleCat(d.statusid) } );
	simulation.force("link")
		.id(function(d) { return d.id ;})
		.distance(forceProperties.link.distance)
		.strength(0.01)
		.iterations(forceProperties.link.iterations)
		.links(forceProperties.link.enabled ? graph.links : []);

}

////////////////////////////////////////////////////////////////////////////////////////////////////
//GROUP BY NATIONALITY
////////////////////////////////////////////////////////////////////////////////////////////////////

function forceNational() {

	//width divider
	var div = Math.max.apply(Math,graph.nodes.map(function(d){return d.wnid;}));
	console.log(div);
	console.log(width);
	var scale = width/div/1.5;
	console.log(scale);
	var arrdomain = Array.from(Array(div), (value, index) => (index+1));
	var arrrange = Array.from(Array(div), (value, index) => ((index+1)*scale));
	console.log(arrrange);
	console.log(arrdomain);

	var scaleCat = d3.scaleOrdinal()
	  .domain(arrdomain)
	  .range(arrrange)

	simulation.force("center")
		.x(width * forceProperties.center.x)
		.y(height * forceProperties.center.y);
	simulation.force("charge")
		.strength(-150)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);
	simulation.force("collide")
		.strength(forceProperties.collide.strength * forceProperties.charge.enabled)
		.radius(forceProperties.collide.radius)
		.iterations(forceProperties.collide.iterations);
	simulation.force("forceY")
		.strength(0.5)
		.y(height * forceProperties.forceY.y);
	simulation.force("forceX")
		.strength(0.7)
		.x(function(d){ return scaleCat(d.wnid) } );
	simulation.force("link")
		.id(function(d) { return d.id ;})
		.distance(forceProperties.link.distance)
		.strength(0.01)
		.iterations(forceProperties.link.iterations)
		.links(forceProperties.link.enabled ? graph.links : []);

}

////////////////////////////////////////////////////////////////////////////////////////////////////
//LOAD DATA
////////////////////////////////////////////////////////////////////////////////////////////////////

//load data
d3.json(url).then(function(_graph) {
	graph = _graph;
	initializeDisplay();
	initializeSimulation();

});

//kelompok warna
var warna = d3.scaleOrdinal(d3.schemeCategory10);

//radius lingkaran
var radius = 12;

////////////////////////////////////////////////////////////////////////////////////////////////////
//FORCE SIMULATION
////////////////////////////////////////////////////////////////////////////////////////////////////

//Force Simulator
var simulation = d3.forceSimulation();

//set up simulation to update location after each tick
function initializeSimulation() {
	simulation.nodes(graph.nodes);
	initializeForce();
	simulation.on("tick", ticked);
}

//values of all force
forceProperties = {
	center: {
		x: 0.5,
		y: 0.5
	},
	charge: {
		enabled: true,
		strength: -60,
		distanceMin: 1,
		distanceMax: 2000
	},
	collide: {
		enabled: true,
		strength: 10,
		iterations: 1,
		radius: 5
	},
	forceX: {
		enabled: true,
		strength: 0.1,
		x: .5
	},
	forceY: {
		enabled: true,
		strength: .1,
		y: .5
	},
	link: {
		enabled: true,
		distance: 50,
		iterations: 1
	}
}

//add force to simulations
function initializeForce() {
	//add force and associate each with a name
	simulation
		.force("link", d3.forceLink())
		.force("charge", d3.forceManyBody())
		.force("collide", d3.forceCollide())
		.force("center", d3.forceCenter())
		.force("forceX", d3.forceX())
		.force("forceY", d3.forceY());
	//apply properties to each force
	updateForces();
}

//apply new force properties
function updateForces() {
	//get radio button value
	if ( document.getElementById("normal").checked ) {
		forceNormal();
	} else if ( document.getElementById("cluster").checked ) {
		forceCluster();
	} else if ( document.getElementById("gender").checked ) {
		forceGender();
	} else if ( document.getElementById("negara").checked ) {
		forceNational();
	} else if ( document.getElementById("status").checked) {
		forceStatus();
	} else if ( document.getElementById("umur").checked) {
		forceAge();
	}


	//update ignored until this is run
	//restart the simulation (important if simulation has already slowdown)
	simulation.alpha(1).restart();
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//DISPLAY
////////////////////////////////////////////////////////////////////////////////////////////////////

//generate the svg objects and force simulation
function initializeDisplay() {
	//set the data and properties	of link lines
	link = g
		.append("g")
		.attr("class","links")
		.selectAll("line")
		.data(graph.links)
		.enter()
		.append("line");

	//set the data and properties of the node circle
	node = g
		.append("g")
		.attr("class", "nodes")
		.selectAll("circle")
		.data(graph.nodes)
		.enter()
		.append("circle")
		.on("click", clickNode)
		.on("mouseover", function(d) {
			d3.select(this).style("cursor", "pointer");
		})
		.on("mouseout", function(d) {
			d3.select(this).style("cursor", "default");
		})
		.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended));

	//text on node
	idText = g
		.append("g")
		.selectAll("text")
		.data(graph.nodes)
		.enter()
		.append("text")
			.attr("class",".text")
			.attr("text-anchor", "middle")
			.attr("dy", ".35em")
			.text(function(d) { return d.id })
			.style("font-family","Lato")
			.style("font-size", 13)
			.style("fill","white")
			.on("click", clickNode)
			.on("mouseover", function(d) {
				d3.select(this).style("cursor", "pointer");
			})
			.on("mouseout", function(d) {
				d3.select(this).style("cursor", "default");
			})
			.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended));

	svg.call(d3.drag()
		.on("start", dragstarted)
		.on("drag", dragged)
		.on("end", dragended));

	//node tooltip
	node
		.append("title")
		.text(function(d) { return d.kasus; });

	//visualize the graph
	updateDisplay();
}

//update the display based on the forces (but not positions)
function updateDisplay() {
	node
		.attr("r", radius)
		.style("fill", function(d) {return warna( d.klasterid );})
		.style("stroke", "white")
		.style("stroke-width", 3)
		.on("mouseover", fade(.1, "black"))
		.on("mouseout",fade(1, "white"));

	link
		.style("stroke", "white")
		.style("stroke-width", 3);

	idText
		.on("mouseover", fade(.1, "black"))
		.on("mouseout",fade(1, "white"));

	var linkedByIndex = {};
	graph.links.forEach(function(d) {
			linkedByIndex[d.source.index + "," + d.target.index] = 1;
	});

	console.log(linkedByIndex);

	function isConnected(a, b) {
			return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
	}

	function fade(opacity,color) {
                 return function(d) {

              //node.style("stroke-opacity", function(o) {
                 //thisOpacity = isConnected(d, o) ? 1 : opacity;
                 //this.setAttribute('fill-opacity', thisOpacity);
                 //return thisOpacity;
             //});

   var connected = [d];

   node.style("stroke-opacity", function(o) {
       thisOpacity = opacity;
       connected.forEach(function(e) {
           if(isConnected(e, o)) { thisOpacity = 1; }
       });
       this.setAttribute('fill-opacity', thisOpacity);
       return thisOpacity;
   });



   link
	 .style("stroke-opacity", function(o) {
       thisOpacity = opacity;
           connected.forEach(function(e) {
               if(o.source === e || o.target === e) {
                   thisOpacity = 1;
               }
           });
           return thisOpacity;
        })
        .style("stroke", function(o) {
               thisColor = color;
               connected.forEach(function(e) {
                   if(o.source === e || o.target === e) {
                       thisColor = "white";
                   }
               });
               return thisColor;
           });

       };

       }

}

//update the position after each simulation tick
function ticked() {
	link
		.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

	node
		.attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });

	idText
		.attr("x", function(d){ return d.x; })
		.attr("y", function(d){ return d.y; });
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// UI EVENTS
////////////////////////////////////////////////////////////////////////////////////////////////////

function dragstarted(d) {
	if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	d.fx = d.x;
	d.fy = d.y;
}

function dragged(d) {
	d.fx = d3.event.x;
	d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0.0001);
  d.fx = null;
  d.fy = null;
}

// convenience function to update everything (run after UI input)
function updateAll() {
    updateForces();
    updateDisplay();
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// TOOLTIP
////////////////////////////////////////////////////////////////////////////////////////////////////
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
      htmlContent += "<tr><td width=\"30%\">Jenis Kelamin: <\/td> <td><strong>" + node.gender +"<\/strong><\/td><\/tr>"
      htmlContent += "<tr><td width=\"30%\">Umur: <\/td> <td><strong>" + node.umurtext +"<\/strong><\/td><\/tr>"
			htmlContent += "<tr><td width=\"40%\">Status: <\/td> <td><strong>" + node.status +"<\/strong><\/td><\/tr>"
			htmlContent += "<tr><td width=\"30%\">Kewarganegaraan: <\/td> <td><strong>" + node.wn +"<\/strong><\/td><\/tr>"
      htmlContent += "<tr><td width=\"30%\">Tanggal Pengumuman: <\/td> <td><strong>" + node.pengumuman +"<\/strong><\/td><\/tr>"
      htmlContent += "<tr><td width=\"30%\">Asal Penularan: <\/td> <td><strong>" + node.penularan +"<\/strong><\/td><\/tr>"
      htmlContent += "<tr><td width=\"30%\">Klaster <\/td> <td><strong>" + node.klaster +"<\/strong><\/td><\/tr>"
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

function zoom_actions(){
    g.attr("transform", d3.event.transform)
}
