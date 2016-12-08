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
	componentDidMount() {
		// Fetch the entire graph
		if (localStorage.getItem('topic_id')) {
			const topicId = localStorage.getItem('topic_id');
			this.props.getNodes(topicId);
		}
	}
	/**
	 * Update the node's position in redux and firebase
	 * @param  {Array} pos    [x, y] position of the node
	 * @param  {String} nodeId the id of the node
	 * @return {None}        
	 */
	moveNode(pos, nodeId) {
		this.props.moveNode(pos, nodeId);
		const topicId = localStorage.getItem('topic_id');
		moveNode(pos, nodeId, topicId);
	}

	/**
	 * Set the current subtree to be this node
	 * @param  {Object} node The node object
	 * @return {None}      
	 */
	selectSubtree(nodeProps) {
		const { text, extra, x, y, id } = nodeProps;
		let { edges } = nodeProps;
		if (typeof extra === 'string') {
			edges = JSON.parse(edges);
		}
		const selectedNode = {
			title: text,
			text: extra,
			edges,
			x,
			y,
			id
		};
		this.props.selectSubtree(selectedNode);
	}

	/**
	 * Render the full graph
	 * @return {None} 
	 */
	renderGraph() {
		if (this.props.nodes) {
			return this.props.nodes.map((node) => (
				<Node
					key={node.id}
					id={node.id}
					size={50}
					x={node.x}
					y={node.y}
					onClick={(nodeProps) => this.selectSubtree(nodeProps)}
					dragNode={(pos) => this.moveNode(pos, node.id)}
					nodeOutline='#000000'
					nodeColor='#ffffff'
					textColor='#000000'
					text={node.title}
					extra={node.text}
					edges={node.edges}
				/>
			));
		}
	}

	render() {
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
