import React, { Component } from 'react';
import {Tabs} from "antd";
import LineGraph from "./component/LineGraph";
import Factors from "./component/Factors";
import Prediction from './component/Form';

const TabPane = Tabs.TabPane;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tabs defaultActiveKey="1">
          <TabPane tab="lines" key="1"><LineGraph localURL="http://localhost:5000/"/></TabPane>
          <TabPane tab="Factors" key="2"><Factors localURL="http://localhost:5000/"/></TabPane>
          <TabPane tab="FEGraph" key="3"> <Prediction  localURL="http://localhost:5000/"/></TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
