import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

class LogRegCoef extends Component {
  constructor(props) {
    super(props)
    this.state = {
        coef: [],
    }
  };

  componentDidMount() {
      fetch(this.props.localURL+'getcoefficients/')
      .then(results => {return results.json()})
      .then(jsonRes => {this.setState({coef: jsonRes})});
  }

  
  
  render() {
    var data_out = [];
    var columns_out = []
    for (var i in this.state.coef) { parseFloat(data_out.push(this.state.coef[i])); columns_out.push(i);}
    return (
      <div className="RadarChart">
        <Bar
          data= 
          {{
            labels:columns_out,
            datasets: [{
                fillColor: "rgba(51,49,90,0.5)",
                strokeColor: "rgba(255,255,255,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                label: 'Logistic Regression Coefficients',
                data: data_out
            }]
        }}
        />
        <div style={{textAlign: 'center'}}>
          <h4> -Explanation- </h4>
          <li>These are the logistic regression coefficients</li>
          <li>Positive effects will lead to a higher probability of heart disease</li>
          <li>Negative effects will lead to a lower probability of heart disease</li>
          <li>The probability is calculated based on Y=sigmoid(XB) </li>
          <li>where X is the sample values, B is the coefficients and Y is the probability of heart disease</li>
          <h4> </h4>
          <h4>-Legend-</h4> 
          <li>Intercept: the intercept for logistic regression</li>
          <li>Age: the age of the patient</li>
          <li>Sex: (1: male; 0: female)</li>
          <li>cp: chest pain type (1:typical angin, 2:atypical angina, 3:non-anginal pain, 4:asymptomatic)</li>
          <li>trestbps: resting blood pressure</li>
          <li>chol: serum cholestoral in mg/dl</li>
          <li>fbps: (1:fasting blood sugar > 120 mg/dl, 2: \> 120 mg/dl )</li>
          <li>restecg: resting electrocardiographic (0:normal, 1:ST-T wave abnormality, 2:left ventricular hypertrophy)</li>
          <li>exang: exercise induced angina (1: True, 0: False)</li>
          <li>slope: the slope of the peak exercise ST segment</li>
          <li>ca: number of major vessels (0-3) colored by flourosopy</li>
          <li>thal(Thalassemia): 3 = normal; 6 = fixed defect; 7 = reversable defect</li>
          </div>
      </div>
    );
  }
}

export default LogRegCoef;
