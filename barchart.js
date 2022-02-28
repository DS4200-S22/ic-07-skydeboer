/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// Creates SVG with specified dimensions from the variables 
//and assigns to the hard coded bar class 
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// This gets the highest Y / score value in the data set
let maxY1 = d3.max(data1, function(d) { return d.score; });

// This creates the Y axis scale, specifies it is linear, and that the domain is from 0 to the max Y value
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// This creates the X axis scale, specifies that the domain is the range of the data
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// this appends the y axis to the page  
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// This appends the x axis to the page; at each tick add the name of the data
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// this selects all the hard coded bar ids, 
// appends a div, adds the id and class "tooltip", and makes the opactiy 0
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// takes the hover tooltip with the data and adds the name of the data and the score in the hover box  
// changes opacity to 1
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// positions the tooltip relative to the x and y of the mouse with an offset
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.pageX)+"px") 
          .style("top", (event.pageY + yTooltipOffset) +"px"); 
}

// this removes the tooltip when the mouse leaves the data, changes opacity to 0
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// finds the class bar in the svgs, then adds the data and appends a new rect to the svg for every row
// adds the class bar to the bars, adds the x values and the y values for the rectangles from the data, 
// then adds the axes from the data
// then the event listeners are added to the svg 
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);







const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

const tooltip2 = d3.select("#csv-bar") 
  .append("div") 
  .attr('id', "tooltip2") 
  .style("opacity", 0) 
  .attr("class", "tooltip"); 

// takes the hover tooltip with the data and adds the name of the data and the score in the hover box  
// changes opacity to 1
const mouseover2 = function(event, d) {
  tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
    .style("opacity", 1);  
}

// positions the tooltip relative to the x and y of the mouse with an offset
const mousemove2 = function(event, d) {
  tooltip2.style("left", (event.pageX)+"px") 
    .style("top", (event.pageY + yTooltipOffset) +"px"); 
}

// this removes the tooltip when the mouse leaves the data, changes opacity to 0
const mouseleave2 = function(event, d) { 
  tooltip2.style("opacity", 0); 
}


// This creates the Y axis scale, specifies it is linear, and that the domain is from 0 to the max Y value


// This creates the X axis scale, specifies that the domain is the range of the data



d3.csv("data/barchart.csv").then(function(data2){


let maxY2 = d3.max(data2, function(d) { return d.score; });
let xScale2 = d3.scaleBand()
            .domain(d3.range(data2.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 
let yScale2 = d3.scaleLinear()
            .domain([0,maxY2])
            .range([height-margin.bottom,margin.top]); 
  
  svg2.append("g")
      .attr("transform", `translate(${margin.left}, 0)`) 
      .call(d3.axisLeft(yScale2)) 
      .attr("font-size", '20px'); 
  
  svg2.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale2) 
            .tickFormat(i => data2[i].name))  
    .attr("font-size", '20px'); 

    svg2.selectAll("bar") 
    .data(data2) 
    .enter()  
    .append("rect")
      .attr("class", "bar") 
      .attr("x", (d,i) => xScale2(i)) 
      .attr("y", (d) => yScale2(d.score)) 
      .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) 
      .attr("width", xScale2.bandwidth()) 
      .on("mouseover", mouseover2) 
      .on("mousemove", mousemove2)
      .on("mouseleave", mouseleave2);
});

  



