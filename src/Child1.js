import React, { Component } from "react";
import * as d3 from "d3";
class Child1 extends Component {
  componentDidMount() {
    console.log("Child1 componentDidMount data1:", this.props.data1);
    this.drawScatterPlot();
  }
  componentDidUpdate() {
    console.log("Child1 componentDidUpdate data1:", this.props.data1);
    this.drawScatterPlot();
  }
  drawScatterPlot() {
    const data = this.props.data1;
    if (!data || data.length === 0) return;
    const svg = d3.select(".child1_svg");
    svg.selectAll("*").remove();
    const margin = { top: 50, right: 30, bottom: 50, left: 60 },
      width = 650 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
    const scatterSvg = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.total_bill)])
      .range([0, width]);
    scatterSvg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.tip)])
      .range([height, 0]);
    scatterSvg.append("g").call(d3.axisLeft(y));
    scatterSvg
      .append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x(d.total_bill))
      .attr("cy", (d) => y(d.tip))
      .attr("r", 3)
      .style("fill", "#69b3a2");
    scatterSvg
    .append("text")
      .attr("text-anchor", "end")
      .attr("x", width / 2 )
      .attr("y", height + margin.bottom - 10)
      .style("font-weight", "bold","font-size", "16px")
      .text("Total Bill");
      //.append("text")
      //.attr("text-anchor", "middle")
      //.attr("x", width / 2 + margin.left)
      //.attr("y", height + margin.top + 20)
     // .text("Total Bill");
    scatterSvg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top - height / 2 + 20)
      .style("font-weight", "bold","font-size", "16px")
      .text("Tips");
    scatterSvg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .style("font-weight", "bold","font-size", "16px")
      .text("Total Bill vs. Tips");
  }
  render() {
    return <svg className="child1_svg"></svg>;
  }
}
export default Child1;
