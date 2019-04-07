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
		fetch('http://localhost:5000/getprediction', {
			method: "POST",
			body: JSON.stringify(this.state),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		}).then(response => {
				console.log(response.json());
		})
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
				<label>age</label>
				<input
					type="text"
					name="age"
					value={age}
					onChange={this.onChange} />
				<label>sex</label>
				<input
					type="text"
					name="sex"
					value={sex}
					onChange={this.onChange} />
				<label>cp</label>
				<input
					type="text"
					name="cp"
					value={cp}
					onChange={this.onChange} />
				<label>trestbps</label>
				<input
					type="text"
					name="trestbps"
					value={trestbps}
					onChange={this.onChange} />
				<label>chol</label>
				<input
					type="text"
					name="chol"
					value={chol}
					onChange={this.onChange} />
				<label>fbs</label>
				<input
					type="text"
					name="fbs"
					value={fbs}
					onChange={this.onChange} />
				<label>restecg</label>
				<input
					type="text"
					name="restecg"
					value={restecg}
					onChange={this.onChange} />
				<label>thalach</label>
				<input
					type="text"
					name="thalach"
					value={thalach}
					onChange={this.onChange} />
				<label>exang</label>
				<input
					type="text"
					name="exang"
					value={exang}
					onChange={this.onChange} />
				<label>oldpeak</label>
				<input
					type="text"
					name="oldpeak"
					value={oldpeak}
					onChange={this.onChange} />
				<label>slope</label>
				<input
					type="text"
					name="slope"
					value={slope}
					onChange={this.onChange} />
				<label>ca</label>
				<input
					type="text"
					name="ca"
					value={ca}
					onChange={this.onChange} />
				<label>thal</label>
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
