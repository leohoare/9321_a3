import React, { Component } from 'react';
import {Bar, Line, Pie, Scatter} from 'react-chartjs-2';

class GenericGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    };

    componentDidMount() {
        fetch(this.props.localURL+'getdata/'+this.props.agesex+'/'+this.props.indicator)
        .then(results => {return results.json()})
        .then(jsonRes => {this.setState({data: jsonRes.records})});

    }
    
    components = {
        Line: Line,
        Bar: Bar,
        Pie: Pie,
        Scatter: Scatter
    };

    agesexMapping = {
        1: "Age",
        2: "Sex"
    }

    indicatorMapping = {
        3: "chest pain type (1=typical angin, 2=atypical angina, 3=non-anginal pain, 4=asymptomatic)",
        4: "resting blood pressure",
        5: "serum cholestoral in mg/dl",
        6: "fasting blood sugar > 120 mg/dl",
        7: "resting electrocardiographic results (0=normal, 1=having ST-T wave abnormality, 2=showing left ventricular hypertrophy)",
        8: "maximum heart rate achieved",
        9: "exercise induced angina",
        10: "oldpeak = ST depression induced by exercise relative to rest",
        11: "the slope of the peak exercise ST segment",
        12: "number of major vessels (0-3) colored by flourosopy",
    }
    
    render(){
        console.log(this.state.data)
        const GraphType = this.components[this.props.graphType];
        return(
            <GraphType
                data= {{
                    // labels: this.indicatorMapping[this.props.indicator],
                    datasets: [{
                        // label: "My First dataset",
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: this.state.data
                    }]
                }}
                options= {{
                    scales: {
                        yAxes: [{
                          scaleLabel: {
                            display: true,
                            labelString: this.indicatorMapping[this.props.indicator]
                          }
                        }],
                        xAxes: [{
                          scaleLabel: {
                            display: true,
                            labelString: this.agesexMapping[this.props.agesex]
                          }
                        }],
                } 
                }}
            />
        );
    }
}


export default GenericGraph;
