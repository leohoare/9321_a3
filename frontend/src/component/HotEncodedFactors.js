import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
	HorizontalGridLines,
    VerticalBarSeries,
	ChartLabel,
    LabelSeries
} from 'react-vis';

class HotEncodedFactors extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            values: [],
        };
    }

	componentDidMount() {
        fetch(this.props.localURL + 'getnoncatfactors/')
			.then(results => {return results.json()})
			.then(response => {this.setState({
								values: response.map(item => ({
									x: item.x,
									y: item.y,
						}))
					})
				})
		}

    render() {
		const dataArr = this.state.values.map((d) => {
			return {x: d.x, y: d.y}
		});
        const chartWidth = 800;
        const chartHeight = 500;
        const chartDomain = [0, 1];
		const chartMargin = {"left": 100, "right": 20, "top": 65, "bottom": 65};
        return (
			<div style={{textAlign: 'center', alignItems:'center', display:'inline',justifyContent:'center'}}>            
			<XYPlot 
                xType="ordinal" 
                width={chartWidth} 
                height={chartHeight} 
                yDomain={chartDomain}
				margin={chartMargin}
			>
				<HorizontalGridLines />
                <XAxis />
                <YAxis />
				<ChartLabel
					text="Factors leading to heart disease"
					includeMargin={false}
					xPercent={0.38}
					yPercent={1.32}
					/>
				<ChartLabel
					text="Impact (Based on entropy)"
					includeMargin={false}
					xPercent={-0.085}
					yPercent={0.63}
					style={{
						transform: 'rotate(-90)',
						textAnchor: 'end'
					}}
					/>
				<ChartLabel
					text="Top Factors Related to Heart Disease"
					includeMargin={false}
					xPercent={0.22}
					yPercent={0.08}
					style={{
						fontWeight: 'bold'
					}}
					/>
                <VerticalBarSeries
                    data={dataArr}
                /> 
				<LabelSeries
                    data={dataArr.map(obj => {
                        return { ...obj, label: obj.y.toFixed(4) }
                    })}
                    labelAnchorX="middle"
                    labelAnchorY="text-after-edge"
					style={{
						fontSize: '13px',
						fill: '#6b6b76'
					}}
                />
            </XYPlot>
			<h4>-Explanation-</h4> 
			<li>	Values with higher importance are selected first in trees.</li>
			<li>	This is due the algorithm maximising entropy (largest information gain).</li>
			<li>	So, values with the highest parameters in this graph are deemed the most important in determing heat disease outcomes.</li>
			<li>	Feature importance was calculated using one hot encoded data.</li>
			<li>	The algorithm was using sklearn feature extraction method</li>
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
        );
    }

}

export default HotEncodedFactors;
