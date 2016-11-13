import React, { Component } from 'react';
import { Line } from 'react-konva';

class Edge extends Component {
	render() {
		console.log(this.props.points);
		return (
			<Line points={this.props.points} stroke='#888888' strokeWidth={2} />
		);
	}
}

export default Edge;
