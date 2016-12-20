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
		let dash = [];
		let edgeColor = this.props.edgeColor;
		if (this.props.dash) {
			dash = [5, 5];
			edgeColor = '#bdc3c7';
		}
		return (
			<Layer>
				<Group>
					<Line 
						points={points} 
						stroke={edgeColor}
						strokeWidth={2}
						dash={dash}
					/>
				</Group>
			</Layer>
		);
	}
}

export default Edge;
