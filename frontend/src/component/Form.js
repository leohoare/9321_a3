import React, { Component } from 'react'
import {Form, Select, Button} from 'antd'

const Option = Select.Option

class Prediction extends Component {
	constructor() {
		super();
		this.state = {
			modeltype: '',
			age: '',
			sex: '',
			cp: '',
			trestbps: '',
			chol: '',
			fbs: '',
			restecg: '',
			thalach: '',
			exang: '',
			oldpeak: '',
			slope: '',
			ca: '',
			thal: '',
		};
	}

	handleSelect = (value,option) => {
		// const attr = option.props.title;
		this.setState({ [ option.props.title] : value });
	}

	handleSubmit = (e) => {
		e.preventDefault()
		fetch('http://localhost:5000/getprediction/', {
			method: "POST",
			body: JSON.stringify(this.state),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},})
		.then(function(response) {
			if (!response.status.ok) {
				const error = new Error(response.body);
				error.response = response;
				throw error;
			}})
		.then(results => {return results.json()})
		.then(jsonres => console.log(jsonres))
		.catch(res => {return res});
		// .catch(err => {test = err.json(); console.log(test)});
	}



	render() {
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 },
		  };
		// const { modeltype, age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal } = this.state;
		return (
			<Form {...formItemLayout} onSubmit={this.handleSubmit}>
				<Form.Item label="sex">
					<Select onSelect={this.handleSelect}>
						<Option title="sex" value="1">male</Option>
						<Option title="sex" value="0">female</Option>
					</Select>
				</Form.Item>
				<Form.Item label="chest pain type">
					<Select onSelect={this.handleSelect} style={{ width: 300 }}>
						<Option title="cp" value="1">typical angin</Option>
						<Option title="cp" value="2">atypical angina</Option>
						<Option title="cp" value="3">non-anginal pain</Option>
						<Option title="cp" value="4">asymptomatic</Option>
					</Select>
				</Form.Item>
				<Form.Item label="fasting blood pressure > 120 mg/dl">
					<Select onSelect={this.handleSelect}>
						<Option title="fbs" value="1">yes</Option>
						<Option title="fbs" value="0">no</Option>
					</Select>
				</Form.Item>
				<Form.Item label="resting electrocardiographic results">
					<Select onSelect={this.handleSelect} style={{ width: 600 }}>
						<Option title="restecg" value="0">normal</Option>
						<Option title="restecg" value="1">having ST-T wave abnormality</Option>
						<Option title="restecg" value="2">showing probable or definite left ventricular hypertrophy</Option>
					</Select>
				</Form.Item>
				<Form.Item label="exercise induced angina">
					<Select onSelect={this.handleSelect}>
						<Option title="exang" value="1">yes</Option>
						<Option title="exang" value="0">no</Option>
					</Select>
				</Form.Item>
				<Form.Item label=" slope of the peak exercise ST segment">
					<Select onSelect={this.handleSelect}>
						<Option title="slope" value="1">1</Option>
						<Option title="slope" value="2">2</Option>
						<Option title="slope" value="3">3</Option>
					</Select>
				</Form.Item>
				<Form.Item label="number of major vessels colored by flourosopy">
					<Select onSelect={this.handleSelect}>
						<Option title="ca" value="0">0</Option>
						<Option title="ca" value="1">1</Option>
						<Option title="ca" value="2">2</Option>
						<Option title="ca" value="3">3</Option>
					</Select>
				</Form.Item>
				<Form.Item label="Thalassemia">
					<Select onSelect={this.handleSelect} style={{ width: 300 }}>
						<Option title="thal" value="3">normal</Option>
						<Option title="thal" value="6">fixed defect</Option>
						<Option title="thal" value="7">reversable defect</Option>
					</Select>
				</Form.Item>
				<Form.Item
				wrapperCol={{ span: 12, offset: 6 }}
				>
					<Button type="primary" htmlType="submit">Submit</Button>
				</Form.Item>
			</Form>
		);
	}
}

export default Prediction
