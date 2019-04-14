import React, { Component } from 'react';
import {Tabs} from 'antd';
import HotEncodedFactors from "./HotEncodedFactors";
import LogRegCoef from "./LogRegCoef";

const TabPane = Tabs.TabPane;

class Factors extends Component {
	render() {
		return (
			<div className="Factors">
				<Tabs defaultActiveKey='1'>
					<TabPane tab="One Hot Encoder Importance" key='1'><HotEncodedFactors localURL="http://localhost:5000/"/></TabPane>
					<TabPane tab="Logistic Regression Weights" key='2'><LogRegCoef localURL="http://localhost:5000/"/></TabPane>
				</Tabs>
			</div>
		);
	}
}

export default Factors;
