import React, { Component } from 'react';
import {Layout, Select, Form, Button} from "antd";

const {Header, Content} = Layout;
const Option = Select.Option;

class LineGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agesex:1,
            indicator:3,
            grapharray:"",
            hidden:true,
        };
    }

    selectAgeSex=(value)=>{
      this.setState({agesex: value})
    }
    selectIndicator=(value)=>{
      this.setState({indicator: value})
    }

    handleSubmit=(e)=>{
      e.preventDefault();
      fetch(this.props.localURL+'getgraph/'+this.state.agesex+'/'+this.state.indicator)
      .then(results => {return results.json()})
      .then(jsonRes => {this.setState({grapharray: jsonRes.bytearray})})
      .then(this.setState({hidden: false}));
    }

    render() {
      // const agesex = age.toString() + sex.toString();
      return (
        <div>            
          <Form onSubmit={this.handleSubmit}>
              <Header>
                <Select defaultValue="Age" placeholder="agesex" style={{ width: 120 }} onChange={this.selectAgeSex}>
                  <Option value="1">Age</Option>
                  <Option value="2">Sex</Option>
                </Select>
                <Select defaultValue="chest pain type" placeholder="indicator" style={{ width: 300 }} onChange={this.selectIndicator}>
                  <Option value="3">chest pain type</Option>
                  <Option value="4">resting blood pressure</Option>
                  <Option value="5">serum cholestoral</Option>
                  <Option value="6">fasting blood sugar</Option>
                  <Option value="7">resting electrocardiographic </Option>
                  <Option value="8">maximum heart rate achieved</Option>
                  <Option value="9">exercise induced angina</Option>
                  <Option value="10">oldpeak</Option>
                  <Option value="11">slope of the peak exercise ST segment</Option>
                  <Option value="12">number of major vessels</Option>
                  <Option value="13">Thalassemia</Option>
                </Select>
                <Button type="primary" htmlType="submit">Get graph</Button>
              </Header>
              <Content>
                <img style={{display:'block',textAlign:'inline',justifyContent:'center'}} alt="line graph"src={"data:image/png;base64," + this.state.grapharray} hidden={this.state.hidden}/>
              </Content>
          </Form>
        </div>
      );
    }
}

export default LineGraph;
