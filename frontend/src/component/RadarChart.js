import React, { Component } from 'react';
import {Radar} from 'react-chartjs-2';

class RadarChart extends Component {
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
    // console.log(this.state.coef)
    // console.log(this.state.coef.age)
    // const asd = String(this.state.coef.age)
    // console.log(asd)
    var data_out = [];
    var columns_out = []
    for (var i in this.state.coef) { parseFloat(data_out.push(this.state.coef[i])); columns_out.push(i);}
    console.log(columns_out.slice(1,5),data_out.slice(1,5))
    return (
      <div className="RadarChart">
        <Radar
          data= 
          {{
            labels:columns_out,
            datasets: [{
                fillColor: "rgba(51,49,90,0.5)",
                strokeColor: "rgba(255,255,255,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                // backgroundColor: "#ffff00",
                // borderColor: "#00FF00",
                // borderWidth: 2,
                data: data_out
                // ,
            }]
        }}
        />
        <h3>logistic regression parameters</h3>
        <h4>intercept : {this.state.coef.intercept}</h4>
        <h4>age : {this.state.coef.age}</h4>
        <h4>trestbps : {this.state.coef.trestbps}</h4>
        <h4>chol : {this.state.coef.chol}</h4>
        <h4>thalach : {this.state.coef.thalach}</h4>
        <h4>oldpeak : {this.state.coef.oldpeak}</h4>
        <h4>sex_0.0 : {this.state.coef["sex_0.0"]}</h4>
        <h4>sex_0.1 : {this.state.coef["sex_1.0"]}</h4>
        <h4>cp_1.0 : {this.state.coef['cp_1.0']}</h4>
        <h4>cp_2.0 : {this.state.coef['cp_2.0']}</h4>
        <h4>cp_3.0 : {this.state.coef['cp_3.0']}</h4>
        <h4>cp_4.0 : {this.state.coef['cp_4.0']}</h4>
        <h4>fbs_0.0 : {this.state.coef['fbs_0.0']}</h4>
        <h4>fbs_1.0 : {this.state.coef['fbs_1.0']}</h4>
        <h4>restecg_0.0 : {this.state.coef['restecg_0.0']}</h4>
        <h4>restecg_1.0 : {this.state.coef['restecg_1.0']}</h4>
        <h4>restecg_2.0 : {this.state.coef['restecg_2.0']}</h4>
        <h4>exang_0.0 : {this.state.coef['exang_0.0']}</h4>
        <h4>exang_0.0 : {this.state.coef['exang_1.0']}</h4>
        <h4>slope_1.0 : {this.state.coef['slope_1.0']}</h4>
        <h4>slope_2.0 : {this.state.coef['slope_2.0']}</h4>
        <h4>slope_3.0 : {this.state.coef['slope_3.0']}</h4>
        <h4>ca_0.0 : {this.state.coef['ca_0.0']}</h4>
        <h4>ca_1.0 : {this.state.coef['ca_1.0']}</h4>
        <h4>ca_2.0 : {this.state.coef['ca_2.0']}</h4>
        <h4>thal_3.0 : {this.state.coef['thal_3.0']}</h4>
        <h4>thal_6.0 : {this.state.coef['thal_6.0']}</h4>
        <h4>thal_7.0 : {this.state.coef['thal_7.0']}</h4>

        <h4> logistic regression -> take Y=sigmoid(XB) to find probabilities, negative effect decreases chance, positive increase... magnitude important</h4>

      </div>
    );
  }
}

export default RadarChart;
