import React, { Component } from 'react';
import {Tabs} from "antd";
import LineGraph from "./component/LineGraph";
import Factors from "./component/Factors";

const TabPane = Tabs.TabPane;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tabs defaultActiveKey="1">
          <TabPane tab="lines" key="1"><LineGraph/></TabPane>
          <TabPane tab="Factors" key="2"><Factors/></TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
