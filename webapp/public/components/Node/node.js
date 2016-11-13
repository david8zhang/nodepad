import React, { Component } from 'react';
import { Circle } from 'react-konva';

class Node extends Component {
	render() {
		return (
			<Circle 
				ref='circle'
				radius={this.props.size} 
				fill='#888888'
				x={this.props.x}
				y={this.props.y} 
			/>
		);
	}
}

export default Node;
