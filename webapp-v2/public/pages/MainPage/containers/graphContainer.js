/* global localStorage */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage } from 'react-konva';
import * as actions from '../../../actions';
import { moveNode } from '../../../lib';
import CreateNodeModal from './createNodeModal';
import { Node, Edge } from '../../../components';


class GraphContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			parent: null
		};
	}

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
		if (typeof edges === 'string') {
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

	toggleModal(parent) {
		this.setState({ parent });
		this.props.toggleModal();
	}

	/**
	 * Render all the nodes within the graph
	 * @return {JSX} A set of node components
	 */
	renderNodes() {
		if (this.props.nodes) {
			return Object.keys(this.props.nodes.toJS()).map((key) => {
				const node = this.props.nodes.toJS()[key];
				return (
					<Node
						key={node.id}
						id={node.id}
						size={50}
						x={node.x}
						y={node.y}
						onAddChild={(parent) => this.toggleModal(parent)}
						onClick={(nodeProps) => this.selectSubtree(nodeProps)}
						dragNode={(pos) => this.moveNode(pos, node.id)}
						nodeOutline='#000000'
						nodeColor='#ffffff'
						textColor='#000000'
						text={node.title}
						extra={node.text}
						edges={node.edges}
					/>
				);
			});
		}
	}

	/**
	 * Render the edges in the graph
	 * @return {JSX} A set of edge components
	 */
	renderEdges() {
		const edges = [];
		if (this.props.nodes) {
			const nodeMap = this.props.nodes.toJS();
			Object.keys(nodeMap).forEach((key) => {
				const node = nodeMap[key];
				if (node.edges) {
					let edgeSet = node.edges;
					if (typeof edgeSet === 'string') {
						edgeSet = JSON.parse(edgeSet);
					}
					const startX = node.x;
					const startY = node.y;
					edgeSet.forEach((edge) => {
						const child = nodeMap[edge.node];
						if (edge.title === 'PARENT') {
							const endX = child.x;
							const endY = child.y;
							edges.push(
								<Edge
									key={`${node.id}${child.id}`}
									startX={startX}
									startY={startY}
									endX={endX}
									endY={endY}
									edgeColor='#000000'
								/>
							);
						}
					});					
				}
			});
		}
		return edges;
	}

	render() {
		return (
			<div>
				<CreateNodeModal 
					isShowingModal={this.props.showChildModal}
					onSubmit={(child) => this.props.onAddChild(child, this.state.parent)}
					header='Add a new Child'
					onCancel={() => this.props.onClose()}
				/>
				<Stage width={1000} height={1000}>
					{this.renderEdges()}
					{this.renderNodes()}
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
