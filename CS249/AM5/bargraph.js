//dataset 
// var nestedGpaC;
// var labels = [];

//size of SVG
var width = 500;
var height = 300;

d3.json("gpachange_before.json", function(data) {
  dataViz(data.gpachange_before)
});

function dataViz(incomingData) {
    // gpaCData = data.gpachange;
    var nestedGpaC = d3.nest()
        .key(function(d) {return d.gpa})
        // .entries(gpaCData);
        .entries(incomingData);
        // nestedGpaC.forEach(function(d) {
        //     d.num = d.values.length; // add a new property to each object
        // });
  
   var chart =  d3.select("svg")
        .attr({"width":width, "height":height})
        .selectAll("rect")


    var bar = chart.data(nestedGpaC)
        .enter();

    // var xScale = d3.scale.ordinal().domain(d.discipline).rangeBands([0,width]);
    var yScale = d3.scale.linear().domain([0,60]).range([height, 0]);

    bar.append("rect")
      .attr("class","bar")
      .attr("width", 20) // fixed value for each bar width
      .attr("height", function(d) {return (d.key - 3)*100})
      .attr("x", function(d,i) {return i*30}) // fixed start for a bar box
      .attr("y", function(d) {return yScale(d.key)})
      .style("fill","blue");
      
    // bar.append("text")
    //     .style("font-size","30px")
    //     .attr("x", 10)
    //     .text(function(d){return d.values[0].discipline; });
}

    d3.select(".bar")
      .on("click", function(){
         d3.json("gpachange_after.json", function(data) {
            dataViz(data.gpachange_after)
         // alert("You clicked!")
        })
      })  



