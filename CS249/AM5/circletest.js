//add text
d3.select("#introtext")
  .style("background-image","url(Wellesley_college_panorama-red.jpg)") 
  .style("padding","40px") //hacky, just want make it the filled screen
  .style("padding-left","150px")
  .style("font-family", "Georgia,serif")
  .style("margin-left","auto")
  .style("margin-right","auto")
  .style("font-size","70px")
  .append("text")
  .attr("id","text")
  .text("Let's Talk About Grade Deflation");   

d3.select("#text")
  .style("fill","white")
  .style("opacity", 0)
  .transition()
  .delay(300)
  .style("opacity", 1);

var dataset = [ 5, 10, 20, 45, 6, 25 ];

//Easy colors accessible via a 10-step ordinal scale
var color = d3.scale.category10();

var colors = {};

var pie = d3.layout.pie();
pie(dataset);

var w = 300;
var h = 300;

var outerRadius = w / 2;
var innerRadius = 0;
var arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);


//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

//Set up groups
var arcs = svg.selectAll("g.arc")
        .data(pie(dataset))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");

//Draw arc paths
    arcs.append("path")
        .attr("fill", function(d, i) { //iteration happening
            return color(i);
        })
        .attr("d", arc) //matched the data

var gpaCData, nestedGpaC;

d3.json("gpachange.json",function(data) {
    gpaCData = data.gpachange;
    nestedGpaC = d3.nest()
        .key(function(d) {return d.treated})
        .entries(gpaCData);
})

var studentData, nestedStudentData;

d3.json("gpaimpact.json",function(data) {
    studentData = data.gradeimpact;
    nestedStudentData = d3.nest()
        .key(function(d) {return d.category})
        .entries(studentData);
})