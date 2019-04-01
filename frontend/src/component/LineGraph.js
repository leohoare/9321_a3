import React, { Component } from 'react';
import {Chart,Geom,Axis,Tooltip, Legend} from "bizcharts";

// fake data
const data = [
    {
      age: "10",
      value: 30,
      sex:"F"
    },
    {
      age: "20",
      value: 40,
      sex:"F"
    },
    {
      age: "30",
      value: 35,
      sex:"F"
    },
    {
      age: "40",
      value: 50,
      sex:"F"
    },
    {
      age: "50",
      value: 49,
      sex:"M"
    },
    {
      age: "60",
      value: 60,
      sex:"M"
    },
    {
      age: "70",
      value: 70,
      sex:"M"
    },
    {
      age: "80",
      value: 90,
      sex:"F"
    },
    {
      age: "90",
      value: 130,
      sex:"M"
    }
  ];
  const cols = {
    value: {
      min: 0
    },
    age: {
      range: [0, 1]
    }
  };

class LineGraph extends Component {
  render() {
    return (
        <div>
        <Chart height={400} data={data} scale={cols} forceFit>
          <Axis name="age" title />
          <Axis name="value" title />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="line" position="age*value" size={2} />
          <Geom
            type="point"
            position="age*value"
            size={4}
            shape={"circle"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
          <Legend/>
        </Chart>
      </div>
    );
  }
}

export default LineGraph;
