import React, { Component } from 'react';
import {Layout, Select,InputNumber} from "antd";
import GenericGraph from "/GenericGraph"

const {Header, Content} = Layout;
const Option = Select.Option;

class LineGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex:0,
            age:0,
            indicator:""
        };
    }

    selectSex=(value)=>{
      this.setState({sex: value})
    }
    selectAge=(value)=>{
      this.setState({age: value})
    }
    selectIndicator=(value)=>{
      this.setState({indicator: value})
    }

    render() {
      const{sex, age, indicator} = this.state;
      const agesex = age.toString() + sex.toString();
      return (
        <div>
           <Header>
              <Select placeholder="sex" style={{ width: 120 }} onChange={this.selectSex}>
                  <Option value="1">male</Option>
                  <Option value="0">female</Option>
              </Select>
              <InputNumber placeholder="age" min={0} max={100} onChange={this.selectAge} />
              <Select placeholder="indicator" style={{ width: 120 }} onChange={this.selectIndicator}>
                  <Option value="cp">chest pain type</Option>
                  <Option value="trestbps">resting blood pressure</Option>
                  <Option value="chol">serum cholestoral</Option>
                  <Option value="fbs">fasting blood sugar</Option>
                  <Option value="restecg">resting electrocardiographic </Option>
                  <Option value="thalach">maximum heart rate achieved</Option>
                  <Option value="exang">exercise induced angina</Option>
                  <Option value="oldpeak">oldpeak</Option>
                  <Option value="slope">slope of the peak exercise ST segment</Option>
                  <Option value="ca">number of major vessels</Option>
                  <Option value="thal">Thalassemia</Option>
              </Select>
          </Header>
          <Content>
          <GenericGraph
              agesex={agesex}
              indicator={indicator}
              localURL="http://localhost:5000/"
              graphType='Scatter'
            />
          </Content>
        </div>
      );
    }
}

export default LineGraph;
