/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import styles from './containers.css';

class SidebarContainer extends Component {
	renderSubtree() {
		// Traverse the edges in preorder and add it to an array
		const preOrder = (root) => {
			const subTopics = [];
			let node = root;
			if (typeof node.edges === 'string') {
				node.edges = JSON.parse(node.edges);
			}
			if (!node.edges || node.edges.length === 0) {
				node.depth = 0;
				return [node];
			}
			const stack = [];
			node.depth = 0;
			stack.push(node);
			while (stack.length !== 0) {
				// Keep track of depth
				node = stack.pop();
				const depth = node.depth;
				subTopics.push(node);
				if (typeof node.edges === 'string') {
					node.edges = JSON.parse(node.edges);
				}
				if (node.edges.length > 0) {
					const reverseEdgeSet = JSON.parse(JSON.stringify(node.edges)).reverse();
					reverseEdgeSet.forEach((edge) => {
						// We only want nodes that are children (no siblings)
						if (edge.title === 'PARENT') {
							const childNode = this.props.nodes.toJS()[edge.node];
							childNode.depth = depth + 1;
							stack.push(childNode);
						}
					});
				} 			
			}
			return subTopics;
		};
		return preOrder(this.props.subTree).map((topic, index) => {
			const { title, text, depth } = topic;
			const padding = depth * 10;
			const style = { paddingLeft: `${padding}px` };

			// Base header size on depth
			let size;
			switch (depth) {
				case 0: {
					size = '35px';
					break;
				}
				case 1: {
					size = '30px';
					break;					
				}
				case 2: {
					size = '25px';
					break;
				}
				case 3: {
					size = '20px';
					break;
				}
				case 4: {
					size = '18px';
					break;
				}
				default:
					size = '18px';
					break;
			}
			return (
				<div style={style} key={index}>
					<b style={{ fontSize: size }}>
						{title}
					</b>
					<p>{text}</p>
				</div>
			);
		});
	}

	render() {
		return (
			<div className={styles.sidebar}>
				{
					this.props.subTree && 
					this.renderSubtree()
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => (
	{
		nodes: state.nodes,
		subTree: state.subTree
	}
);

export default connect(mapStateToProps, actions)(SidebarContainer);
