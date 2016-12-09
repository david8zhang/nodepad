import React, { Component } from 'react';
import { Layer, Circle, Text, Group } from 'react-konva';

class Node extends Component {
	constructor(props) {
		super(props);
		this.state = {
			x: this.props.x,
			y: this.props.y,
			updated: false,
			highlight: false
		};
	}

	componentDidMount() {
		// Make the text for the node aligned in the middle
		const textOffsetW = this.refs[`text ${this.props.id}`].getWidth() / 2;
		const textOffsetH = this.refs[`text ${this.props.id}`].getHeight() / 2;
		const x = this.refs[`circle ${this.props.id}`].getX();
		const y = this.refs[`circle ${this.props.id}`].getY();

		// 'updated' field is to prevent text flickering within the nodes
		this.setState({
			x: x - textOffsetW,
			y: y - textOffsetH,
			updated: true
		});
	}

	/**
	 * Define what to do when the node is dragged around
	 * @return {none} 
	 */
	dragNode() {
		const node = this.refs[`node ${this.props.id}`];
		const nodeX = node.getX();
		const nodeY = node.getY();
		if (this.props.dragNode) {
			this.props.dragNode([nodeX, nodeY]);
		}
	}

	/**
	 * Define what to do when the user triggers a drag even
	 * @return {[type]} [description]
	 */
	triggerDrag() {
		const node = this.refs[`node ${this.props.id}`];
		const nodeX = node.getX();
		const nodeY = node.getY();
		if (this.props.triggerDrag) {
			this.props.triggerDrag([nodeX, nodeY]);
		}
	}

	render() {
		let truncated = this.props.text;
		if (this.props.text.length > 15) {
			truncated = this.props.text.substring(0, 10);
			truncated += '...';
		}
		return (
			<Layer>
				<Group
					onClick={() => this.props.onClick(this.props)}
					x={this.props.x}
					y={this.props.y}
					ref={`node ${this.props.id}`}
					draggable='true'
					onDragStart={() => this.triggerDrag()}
					onDragEnd={() => this.dragNode()}
					onMouseEnter={() => this.setState({ highlight: true })}
					onMouseLeave={() => this.setState({ highlight: false })}
				>
					<Circle
						ref={`circle ${this.props.id}`}
						radius={this.props.size} 
						fill={this.props.nodeColor}
						x={0}
						y={0}
						stroke={this.props.nodeOutline}
					/>
					<Text 
						ref={`text ${this.props.id}`}
						x={this.state.x}
						y={this.state.y}
						text={truncated}
						fill={this.state.updated ? this.props.textColor : '#ffffff'}
					/>
					{
						this.state.highlight &&
						<Circle
							onClick={() => this.props.onAddChild(this.props)}
							ref={`button ${this.props.id}`}
							x={0}
							y={50}
							fill='#dddddd'
							stroke={this.props.nodeOutline}
							radius={25}
						/>
					}
				</Group>
			</Layer>
		);
	}
}

export default Node;
