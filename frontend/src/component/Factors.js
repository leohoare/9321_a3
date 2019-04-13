import React, { Component } from 'react';
import {Tabs} from 'antd';
import CategoricalBarChart from "./CategoricalBarChart";
import NonCategoricalBarChart from "./NonCategoricalBarChart";
import RadarChart from "./RadarChart";

const TabPane = Tabs.TabPane;

class Factors extends Component {
	render() {
		return (
			<div className="Factors">
				<Tabs defaultActiveKey='1'>
					<TabPane tab="Categorical Factors" key='1'><CategoricalBarChart localURL="http://localhost:5000/"/></TabPane>
					<TabPane tab="Non-Categorical Factors" key='2'><NonCategoricalBarChart localURL="http://localhost:5000/"/></TabPane>
					<TabPane tab="All Factors" key='3'><RadarChart localURL="http://localhost:5000/"/></TabPane>
				</Tabs>
			</div>
		);
	}
}

export default Factors;
