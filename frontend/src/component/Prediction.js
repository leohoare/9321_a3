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
			result: [],
			visible: false,
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
	  
	allFilled(){
		const obj = (({age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal }) => ({ 
			age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal 
		}))(this.state);

		for (var key in obj){
			if (obj[key] === ''){
				return true;
			}
		}
		return false;
	}

	render() {
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 },
		};

		const { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal } = this.state;
		return (
			<div>
				<Form {...formItemLayout} onSubmit={this.handleSubmit}>
					<Form.Item label="age">
						<InputNumber defaultValue={age} min={29} max={77} onChange={this.setAge} />
					</Form.Item>
					<Form.Item label="sex">
						<Select defaultValue={sex} onSelect={this.handleSelect}>
							<Option title="sex" value="1">male</Option>
							<Option title="sex" value="0">female</Option>
						</Select>
					</Form.Item>
					<Form.Item label="chest pain type">
						<Select defaultValue={cp} onSelect={this.handleSelect} style={{ width: 300 }}>
							<Option title="cp" value="1">typical angin</Option>
							<Option title="cp" value="2">atypical angina</Option>
							<Option title="cp" value="3">non-anginal pain</Option>
							<Option title="cp" value="4">asymptomatic</Option>
						</Select>
					</Form.Item>
					<Form.Item label="trestbps">
						<InputNumber defaultValue={trestbps} min={94} max={200} onChange={this.setTrestbps} />
					</Form.Item>
					<Form.Item label="chol">
						<InputNumber defaultValue={chol} min={126} max={564} onChange={this.setChol} />
					</Form.Item>
					<Form.Item label="fasting blood pressure > 120 mg/dl">
						<Select defaultValue={fbs} onSelect={this.handleSelect}>
							<Option title="fbs" value="1">yes</Option>
							<Option title="fbs" value="0">no</Option>
						</Select>
					</Form.Item>
					<Form.Item label="resting electrocardiographic results">
						<Select defaultValue={restecg} onSelect={this.handleSelect} style={{ width: 600 }}>
							<Option title="restecg" value="0">normal</Option>
							<Option title="restecg" value="1">having ST-T wave abnormality</Option>
							<Option title="restecg" value="2">showing probable or definite left ventricular hypertrophy</Option>
						</Select>
					</Form.Item>
					<Form.Item label="thalach">
						<InputNumber defaultValue={thalach} min={71} max={202} onChange={this.setThalach} />
					</Form.Item>
					<Form.Item label="exercise induced angina">
						<Select defaultValue={exang} onSelect={this.handleSelect}>
							<Option title="exang" value="1">yes</Option>
							<Option title="exang" value="0">no</Option>
						</Select>
					</Form.Item>
					<Form.Item label="oldpeak">
						<InputNumber defaultValue={oldpeak} min={0} max={6} onChange={this.setOldpeak} />
					</Form.Item>
					<Form.Item label=" slope of the peak exercise ST segment">
						<Select defaultValue={slope} onSelect={this.handleSelect}>
							<Option title="slope" value="1">1</Option>
							<Option title="slope" value="2">2</Option>
							<Option title="slope" value="3">3</Option>
						</Select>
					</Form.Item>
					<Form.Item label="number of major vessels colored by flourosopy">
						<Select defaultValue={ca} onSelect={this.handleSelect}>
							<Option title="ca" value="0">0</Option>
							<Option title="ca" value="1">1</Option>
							<Option title="ca" value="2">2</Option>
							<Option title="ca" value="3">3</Option>
						</Select>
					</Form.Item>
					<Form.Item label="Thalassemia">
						<Select defaultValue={thal} onSelect={this.handleSelect} style={{ width: 300 }}>
							<Option title="thal" value="3">normal</Option>
							<Option title="thal" value="6">fixed defect</Option>
							<Option title="thal" value="7">reversable defect</Option>
						</Select>
					</Form.Item>
					<Form.Item
					wrapperCol={{ span: 12, offset: 6 }}
					>
						<Button 
							type="primary" 
							htmlType="submit" 
							onClick={this.showResult}
							disabled={this.allFilled()}
						>
								Submit
						</Button>
					</Form.Item>
				</Form>		
				<Drawer
				title="Result"
				placement="right"
				onClose={this.closeResult}
				visible={this.state.visible}

				width={500}
				>
				<img src={require("./../images/loader.gif")}  alt="loader" style={{
					margin: 'auto',
					display : this.state.result.length > 0 ? 'none' : 'block'
				}}/>
				<p style = {{ visibility:this.state.result.length > 0 ? 'visible' : 'hidden'}}>
					<li>Accuracy: Prediction accuracy is based on training 80% and testing on remaining 20%</li>
					<li>Time: Time taken in seconds for model to train</li>
					<li>Prediction: Outcome whether patient is predicted to have heart disease</li>
				</p>
				<List
					itemLayout="horizontal"
					dataSource={this.state.result}
					renderItem={item => (
					<List.Item>
						<List.Item.Meta
						title={item.model}
						/>
						time : {item.time.toFixed(4)} seconds<br/>
						accuracy : {(item.accuracy*100).toFixed(2)}%<br/>
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
