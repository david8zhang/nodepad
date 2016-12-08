/* global localStorage */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage } from 'react-konva';
import * as actions from '../../../actions';
import { moveNode } from '../../../lib';
import CreateNodeModal from './createNodeModal';
import { 
	Node 
} from '../../../components';


class GraphContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowingModal: false,
			parent: null
		};
	}

	componentDidMount() {
		console.log('Mounted');

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
					onAddChild={(parent) => this.setState({ isShowingModal: true, parent })}
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
				<CreateNodeModal 
					isShowingModal={this.state.isShowingModal}
					onSubmit={(child) => this.props.onAddChild(child, this.state.parent)}
					header='Add a new Child'
					onCancel={() => this.setState({ isShowingModal: false })}
				/>
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
