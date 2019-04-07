import React, { Component } from 'react';
import {Chart,Geom,Axis,Tooltip} from "bizcharts";
// import {Layout, Select} from "antd";

// const {Header, Content} = Layout;
// const Option = Select.Option;

// fake data
const data = [
    {
      age: "10",
      value: 30,
    },
    {
      age: "20",
      value: 40,
    },
    {
      age: "30",
      value: 35,
    },
    {
      age: "40",
      value: 50,
    },
    {
      age: "50",
      value: 49,
    },
    {
      age: "60",
      value: 60,
    },
    {
      age: "70",
      value: 70,
    },
    {
      age: "80",
      value: 90,
    },
    {
      age: "90",
      value: 130,
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

// {/* <Header>
//     <Select defaultValue="both" style={{ width: 120 }} onChange={this.handleChange}>
//         <Option value="male">male</Option>
//         <Option value="female">female</Option>
//         <Option value="both" >any sex</Option>                    <Option value="Yiminghe">yiminghe</Option>
//     </Select>
// </Header> */}

class LineGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex:"both"
        };
    }


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
          </Chart>
        </div>
      );
    }
}

export default LineGraph;
