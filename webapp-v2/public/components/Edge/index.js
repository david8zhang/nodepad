import React, { Component } from 'react';
import { Layer, Group, Line } from 'react-konva';

class Edge extends Component {
	render() {
		const points = [
			this.props.startX,
			this.props.startY,
			this.props.endX,
			this.props.endY
		];
		console.log(points);
		return (
			<Layer>
				<Group>
					<Line 
						points={points} 
						stroke={this.props.edgeColor}
						strokeWidth={2}
					/>
				</Group>
			</Layer>
		);
	}
}

export default Edge;
