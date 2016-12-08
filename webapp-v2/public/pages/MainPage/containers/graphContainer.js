/* global localStorage */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage } from 'react-konva';
import * as actions from '../../../actions';
import { moveNode } from '../../../lib';
import { 
	Node 
} from '../../../components';


class GraphContainer extends Component {
	moveNode(pos, nodeId) {
		this.props.moveNode(pos, nodeId);
		const topicId = localStorage.getItem('topic_id');
		moveNode(pos, nodeId, topicId);
	}

	renderGraph() {
		if (this.props.nodes) {
			return this.props.nodes.map((node) => (
				<Node
					key={node.id}
					id={node.id}
					size={50}
					x={node.x}
					y={node.y}
					dragNode={(pos) => this.moveNode(pos, node.id)}
					nodeOutline='#000000'
					nodeColor='#ffffff'
					textColor='#000000'
					text={node.title}
				/>
			));
		}
	}

	render() {
		console.log(this.props.nodes.toJS());
		return (
			<div>
				<Stage width={1000} height={1000}>
					{this.renderGraph()}
				</Stage>
			</div>
		);
	}
}

const mapStateToProps = (state) => (
	{
		nodes: state.nodes
	}
);

export default connect(mapStateToProps, actions)(GraphContainer);
