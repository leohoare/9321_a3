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

class NonCategoricalBarChart extends React.Component {
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
					text="Non-Categorical Factors"
					includeMargin={false}
					xPercent={0.38}
					yPercent={1.32}
					/>
				<ChartLabel
					text="Impact"
					includeMargin={false}
					xPercent={-0.085}
					yPercent={0.63}
					style={{
						transform: 'rotate(-90)',
						textAnchor: 'end'
					}}
					/>
				<ChartLabel
					text="Top Non-Categorical Factors Related to Heart Disease"
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
        );
    }

}

export default NonCategoricalBarChart;
