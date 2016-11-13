import React, { Component } from 'react';
import { Text } from 'react-konva';

class Label extends Component {
	render() {
		return (
			<Text 
				x={this.props.x}
				y={this.props.y}
				padding={this.props.padding || 6}
				fontSize={this.props.fontSize || 9}
				text={this.props.text}
				fill='#888888'
			/>
		);
	}
}

export default Label;
