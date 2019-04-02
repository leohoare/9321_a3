import React, { Component } from 'react';

class BEGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            graph: "",
        }
    };

    componentDidMount() {
        fetch(this.props.localURL+'getgraph/'+this.props.agesex+'/'+this.props.indicator)
        .then(results => {return results.json()})
        .then(jsonRes => {this.setState({graph: jsonRes.bytearray})});
    }

    render() {
        console.log(this.state.graph)
        return(
            <img
                src={"data:image/png;base64," + this.state.graph}
            />
        )
    }
}

export default BEGraph