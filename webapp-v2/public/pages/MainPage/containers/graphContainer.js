/* global localStorage */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage } from 'react-konva';
import * as actions from '../../../actions';
import { moveNode, addRelationship } from '../../../lib';
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
	 * Set the relationship src node
	 * @param {Object} src The source node for the relationship pairing
	 */
	setRelSrc(src, isRelSrc) {
		const { id } = src;
		if (isRelSrc) {
			this.props.clearSrcId();
		} else {
			this.props.addRelSrc(id);
		}
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

		// If there is a relSrcId, and it does not match
		// the id of the currently selected node, add a relationship edge
		if (this.props.relSrcId) {
			if (this.props.relSrcId !== id) {
				this.props.addRelationship(this.props.relSrcId, selectedNode);
				const topicId = localStorage.getItem('topic_id');
				addRelationship(this.props.relSrcId, selectedNode, topicId).then(() => {
					console.log(`Added relationship between ${this.props.relSrcId} and ${selectedNode.id}`);
					this.props.clearSrcId();
				});
			}
		}
	}

	// Toggle the modal of the graph contianer
	toggleModal(parent) {
		this.setState({ parent });
		this.props.toggleModal();
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
						isRelSrc={node.id === this.props.relSrcId}
						onAddRelation={(src, isRelSrc) => this.setRelSrc(src, isRelSrc)}
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
						const endX = child.x;
						const endY = child.y;
						if (edge.title === 'PARENT') {
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
						} else if (edge.title === 'RELATION') {
							edges.push(
								<Edge
									key={`${node.id}${child.id}`}
									startX={startX}
									startY={startY}
									endX={endX}
									endY={endY}
									dash
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
		console.log(this.props.relSrcId);
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
		nodes: state.nodes,
		relSrcId: state.relSrcId
	}
);

export default connect(mapStateToProps, actions)(GraphContainer);
