import React, { Component } from 'react';
import {Tabs} from "antd";
import LineGraph from "./component/LineGraph";
import Factors from "./component/Factors";
import GenericGraph from "./component/GenericGraph"
import BEGraph from "./component/BEGraph"

const TabPane = Tabs.TabPane;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tabs defaultActiveKey="1">
          <TabPane tab="lines" key="1"><LineGraph localURL="http://localhost:5000/"/></TabPane>
          <TabPane tab="Factors" key="2"><Factors localURL="http://localhost:5000/"/></TabPane>
          <TabPane tab="FEGraph" key="3">
            <GenericGraph
              agesex='1'
              indicator='3'
              localURL="http://localhost:5000/"
              graphType='Scatter'
            />
          </TabPane>
          {/* Can only rending one at a time... */}
          <TabPane tab="BEGraph" key="4">
            <BEGraph
              agesex='1'
              indicator='3'
              localURL="http://localhost:5000/"
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
