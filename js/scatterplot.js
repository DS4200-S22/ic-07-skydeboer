/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 


const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

const tooltip3 = d3.select("#csv-scatter") 
  .append("div") 
  .attr('id', "tooltip3") 
  .style("opacity", 0) 
  .attr("class", "tooltip"); 

// takes the hover tooltip with the data and adds the name of the data and the score in the hover box  
// changes opacity to 1
const mouseover3 = function(event, d) {
  tooltip3.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
    .style("opacity", 1);  
}

// positions the tooltip relative to the x and y of the mouse with an offset
const mousemove3 = function(event, d) {
  tooltip3.style("left", (event.pageX)+"px") 
    .style("top", (event.pageY + yTooltipOffset) +"px"); 
}

// this removes the tooltip when the mouse leaves the data, changes opacity to 0
const mouseleave3 = function(event, d) { 
  tooltip3.style("opacity", 0); 
}


// This creates the Y axis scale, specifies it is linear, and that the domain is from 0 to the max Y value


// This creates the X axis scale, specifies that the domain is the range of the data



d3.csv("data/scatter.csv").then(function(data3){
  console.log(data3);


let maxY3 = d3.max(data3, function(d) { return d.score; });

let xScale3 = d3.scaleBand()
            .domain(d3.range(data3.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 
   
let yScale3 = d3.scaleLinear()
            .domain([0,maxY3])
            .range([height-margin.bottom,margin.top]); 
  
  svg3.append("g")
      .attr("transform", `translate(${margin.left}, 0)`) 
      .call(d3.axisLeft(yScale3)) 
      .attr("font-size", '20px'); 
  
  svg3.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale3) 
            .tickFormat(i => data3[i].day))  
    .attr("font-size", '20px'); 

    svg3.selectAll("dot") 
    .data(data3) 
    .enter()  
    .append("circle")
      .attr("class", "dot") 
      .attr("cx", (d,i) => xScale3(i) + 50) 
      .attr("cy", (d) => yScale3(d.score)) 
      .attr("r", 10)
      .on("mouseover", mouseover3) 
      .on("mousemove", mousemove3)
      .on("mouseleave", mouseleave3);
});

  









  







