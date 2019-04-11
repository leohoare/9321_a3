import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalBarSeries,
    LabelSeries
} from 'react-vis';

class BarChart extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            values: [],
        };
    }

	componentDidMount() {
        fetch(this.props.localURL + 'getfactors/')
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
        return (
            <XYPlot 
                xType="ordinal" 
                width={chartWidth} 
                height={chartHeight} 
                yDomain={chartDomain}
            >
                <XAxis />
                <YAxis />
                <VerticalBarSeries
                    data={dataArr}
                /> 
				<LabelSeries
                    data={dataArr.map(obj => {
                        return { ...obj, label: obj.y.toFixed(4) }
                    })}
                    labelAnchorX="middle"
                    labelAnchorY="text-after-edge"
                />
            </XYPlot>
        );
    }

}

export default BarChart;
