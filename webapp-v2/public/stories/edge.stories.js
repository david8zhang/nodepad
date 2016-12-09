import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import { Stage } from 'react-konva';
import { Edge, Node } from '../components';

class TestGraph extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startX: 100,
			startY: 200,
			endX: 200,
			endY: 50,
			color: '#000000'
		};
	}

	render() {
		console.log('rerendered');
		return (
			<div>
				<Stage width={1000} height={1000}>
					<Edge
						startX={this.state.startX}
						startY={this.state.startY}
						endX={this.state.endX}
						endY={this.state.endY}
						edgeColor={this.state.color}
					/>
					<Node
						id={1}
						size={50} 
						x={this.state.startX} 
						y={this.state.startY} 
						textColor='#222222'
						nodeColor='#dddddd'
						dragNode={(pos) => this.setState({
							startX: pos[0],
							startY: pos[1],
							color: '#000000'
						})}
						triggerDrag={() => this.setState({
							color: '#ffffff'
						})}
						nodeOutline='#000000'
						text='hello'
					/>
					<Node
						id={2}
						size={50} 
						x={this.state.endX} 
						y={this.state.endY} 
						dragNode={(pos) => this.setState({
							endX: pos[0],
							endY: pos[1],
							color: '#000000'
						})}
						triggerDrag={() => this.setState({
							color: '#ffffff'
						})}
						textColor='#222222'
						nodeColor='#dddddd'
						nodeOutline='#000000'
						text='hello'
					/>
				</Stage>
			</div>
		);
	}
}

storiesOf('Edge', module)
	.add('Default Edge', () => (
		<Stage width={1000} height={1000}>
			<Edge
				startX={0}
				startY={0}
				endX={500}
				endY={500}
				edgeColor='#000000'
			/>
		</Stage>
	))
	.add('Connecting Nodes', () => (
		<Stage width={1000} height={1000}>
			<Edge
				startX={100}
				startY={200}
				endX={200}
				endY={50}
				edgeColor='#000000'
			/>
			<Node
				id={1}
				size={50} 
				x={100} 
				y={200} 
				textColor='#222222'
				nodeColor='#dddddd'
				nodeOutline='#000000'
				text='hello'
			/>
			<Node
				id={2}
				size={50} 
				x={200} 
				y={50} 
				textColor='#222222'
				nodeColor='#dddddd'
				nodeOutline='#000000'
				text='hello'
			/>
		</Stage>
	))
	.add('Draggable Nodes and Readjusting Edges', () => (
		<TestGraph />
	));
