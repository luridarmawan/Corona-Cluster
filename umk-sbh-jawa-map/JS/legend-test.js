var data = [-10000000,-8000000,-6000000,-4000000,-2000000, 0, 1000000,2000000,3000000,4000000,5000000];
console.log(data);

var color = d3.scaleLinear()
  .range(["red","yellow","green"])
  .domain([-10000000, 0, 5000000]);

// Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
var legend = d3.select("#legend-container").append("svg")
  .attr("width", 140)
  .attr("height", 200)
  .selectAll("g")
  .data(data)
  .enter()
  .append("g")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", color);

legend.append("text")
  .data(data)
  .attr("x", 24)
  .attr("y", 9)
  .attr("dy", ".35em")
  .text(function(d) { return d; });
