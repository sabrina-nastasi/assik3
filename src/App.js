import  React, { Component } from "react";
import "./App.css";
import Child1 from "./Child1.js";
import Child2 from "./Child2.js";
import * as d3 from "d3";
class App extends Component{
    constructor(props) {
        super(props);
        this.state = {data: [] };
    }
    componentDidMount() {
        //var self=this
        d3.csv("/tips.csv", (d) => {
            return {
                tip:parseFloat(d.tip), 
                total_bill:parseFloat(d.total_bill),
                day: d.day,
                }
        }).then((csv_data) => {
            this.setState({data: csv_data }, () => {
              console.log("Data loaded in App: ", this.state.data);
            });
            
        })
        .catch((err) => {
            console.log("Error loading CSV data: ", err);
        });
    }
    render(){
        return ( <div className="parent">
            <div className="child1"><Child1 data1={this.state.data}></Child1></div>
            <div className="child2"><Child2 data2={this.state.data}></Child2> </div>
            </div>
        );
}
}
export default App;