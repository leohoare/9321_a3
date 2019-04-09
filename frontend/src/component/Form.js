import React, { Component } from 'react'
import {Form, Select, Button, Drawer,List,InputNumber} from 'antd'

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
			result:{},
			visible:true
		};
	}

	handleSelect = (value,option) => {
		// const attr = option.props.title;
		this.setState({ [ option.props.title] : value });
	}

	setAge = (value) =>{
		this.setState({age:value});
	}

	setTrestbps = (value)=>{
		this.setState({trestbps:value});
	}

	setChol = (value)=>{
		this.setState({chol:value});
	}

	setThalach = (value)=>{
		this.setState({thalach:value});
	}

	setOldpeak = (value)=>{
		this.setState({oldpeak:value});
	}

	showResult  = () =>{
		this.setState({visible:true})
	}

	closeResult = () =>{
		this.setState({visible:false})
	}

	handleSubmit = (e) => {
		const opt = (({ modeltype, age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal }) => ({ 
			modeltype, age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal 
		}))(this.state);
		e.preventDefault()
		fetch('http://localhost:5000/getprediction/', {
			method: "POST",
			body: JSON.stringify(opt),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},})
		.then(results => {
			return results.json()
		}).then(data=>{
			this.setState({result:data});
		})
		.catch(e => console.log(e));
	}

	render() {
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 },
		};

		// const { result } = this.state;
		return (
			<div>
				<Form {...formItemLayout} onSubmit={this.handleSubmit}>
					<Form.Item label="age">
						<InputNumber min={29} max={77} onChange={this.setAge} />
					</Form.Item>
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
					<Form.Item label="trestbps">
						<InputNumber min={94} max={200} onChange={this.setTrestbps} />
					</Form.Item>
					<Form.Item label="chol">
						<InputNumber min={126} max={564} onChange={this.setChol} />
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
					<Form.Item label="thalach">
						<InputNumber min={71} max={202} onChange={this.setThalach} />
					</Form.Item>
					<Form.Item label="exercise induced angina">
						<Select onSelect={this.handleSelect}>
							<Option title="exang" value="1">yes</Option>
							<Option title="exang" value="0">no</Option>
						</Select>
					</Form.Item>
					<Form.Item label="oldpeak">
						<InputNumber min={0} max={6} onChange={this.setOldpeak} />
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
					<Button type="primary" htmlType="submit" onClick={this.showResult}>Submit</Button>
					</Form.Item>
				</Form>		
				<Drawer
				title="Result"
				placement="right"
				onClose={this.closeResult}
				visible={this.state.visible}

				width={500}
				>
				<List
					itemLayout="horizontal"
					dataSource={this.state.result}
					renderItem={item => (
					<List.Item>
						<List.Item.Meta
						title={item.model}
						/>
						time : {item.time}<br/>
						accuracy : {item.accuracy}<br/>
						prediction : {(item.prediction===0)?'No Heart Disease':'Heart Disease! :('}<br/>
					</List.Item>
					)}
				/>
				</Drawer>
		  	</div>
		);
	}
}

export default Prediction
