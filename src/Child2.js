import React, { Component } from "react";
import * as d3 from "d3";
class Child2 extends Component {
  componentDidMount() {
    console.log("Child2 componentDidMount data2:", this.props.data2);
    this.drawBarChart();
  }
  componentDidUpdate() {
    console.log("Child2 componentDidUpdate data2:", this.props.data2);
    this.drawBarChart();
  }
  drawBarChart() {
    const data = this.props.data2;
    if (!data || data.length === 0) return;
    const svg = d3.select(".child2_svg");
    svg.selectAll("*").remove();
    const averageTipsByDay = d3.rollups(
      data,
      (v) => d3.mean(v, (d) => d.tip),
      (d) => d.day
    );
    const processedData = Array.from(averageTipsByDay, ([day, avgTip]) => ({
      day,
      avgTip,
    }));
    const daysOrder = ["Sun", "Sat", "Thur", "Fri"];
    processedData.sort(
      (a, b) => daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day)
    );
    const margin = { top: 50, right: 30, bottom: 50, left: 60 },
      width = 650 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
    const barSvg = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    const x = d3
      .scaleBand()
      .domain(processedData.map((d) => d.day))
      .range([0, width])
      .padding(0.2);
    barSvg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(processedData, (d) => d.avgTip)])
      .range([height, 0]);

    barSvg.append("g").call(d3.axisLeft(y));
    barSvg
      .selectAll("rect")
      .data(processedData)
      .join("rect")
      .attr("x", (d) => x(d.day))
      .attr("y", (d) => y(d.avgTip))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.avgTip))
      .attr("fill", "#69b3a2");
    barSvg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .style("font-weight", "bold","font-size", "16px")
      .text("Day");
    barSvg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -height / 2 + margin.top)
      .style("font-weight", "bold","font-size", "16px")
      .text("Average Tip");
    barSvg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .style("font-weight", "bold","font-size", "16px")
      .text("Average Tip by Day");
  }
  render() {
    return (
      <svg className="child2_svg">
        <g className="g_1"></g>
      </svg>
    );
  }
}
export default Child2;
