import React, { Component } from 'react'

class Form extends Component {
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

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit = (e) => {
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
		const { modeltype, age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal } = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<label>modeltype</label>
				<input
					type="text"
					name="modeltype"
					value={modeltype}
					onChange={this.onChange} />
				<label>Age (integer)</label>
				<input
					type="text"
					name="age"
					value={age}
					onChange={this.onChange} />
				<label>sex (1 = male; 0 = female)</label>
				<input
					type="text"
					name="sex"
					value={sex}
					onChange={this.onChange} />
				<label> chest pain type (1=typical angin,2=atypical angina,3=non-anginal pain,4=asymptomatic)</label>
				<input
					type="text"
					name="cp"
					value={cp}
					onChange={this.onChange} />
				<label>resting blood pressure</label>
				<input
					type="text"
					name="trestbps"
					value={trestbps}
					onChange={this.onChange} />
				<label> serum cholestoral in mg/dl</label>
				<input
					type="text"
					name="chol"
					value={chol}
					onChange={this.onChange} />
				<label> fasting blood sugar > 120 mg/dl</label>
				<input
					type="text"
					name="fbs"
					value={fbs}
					onChange={this.onChange} />
				<label>resting electrocardiographic (0:normal, 1:ST-T wave abnormality, 2:left ventricular hypertrophy)</label>
				<input
					type="text"
					name="restecg"
					value={restecg}
					onChange={this.onChange} />
				<label>maximum heart rate achieved</label>
				<input
					type="text"
					name="thalach"
					value={thalach}
					onChange={this.onChange} />
				<label>exercise induced angina</label>
				<input
					type="text"
					name="exang"
					value={exang}
					onChange={this.onChange} />
				<label>oldpeak = ST depression induced by exercise relative to rest</label>
				<input
					type="text"
					name="oldpeak"
					value={oldpeak}
					onChange={this.onChange} />
				<label>the slope of the peak exercise ST segment</label>
				<input
					type="text"
					name="slope"
					value={slope}
					onChange={this.onChange} />
				<label>number of major vessels (0-3) colored by flourosopy</label>
				<input
					type="text"
					name="ca"
					value={ca}
					onChange={this.onChange} />
				<label>thal(Thalassemia): 3 = normal; 6 = fixed defect; 7 = reversable defect</label>
				<input
					type="text"
					name="thal"
					value={thal}
					onChange={this.onChange} />
				<br />
				<button type="submit">
					Submit
				</button>
			</form>
		);
	}
}

export default Form
