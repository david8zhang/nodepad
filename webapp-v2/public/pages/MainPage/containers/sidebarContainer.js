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
			if (node.edges.length === 0) {
				node.depth = 0;
				return [node];
			}
			const stack = [];
			node.depth = 0;
			stack.push(node);
			while (stack.length !== 0) {
				// Keep track of depth
				node = stack.pop();
				// If we're looking at a non-root node
				if (Object.keys(node).indexOf('node') !== -1) {
					node = node.node;
				}
				const depth = node.depth;
				subTopics.push(node);
				if (node.edges.length > 0) {
					node.edges = node.edges.reverse();
					node.edges.forEach((edge) => {
						// We only want nodes that are children (no siblings)
						if (edge.title === 'PARENT') {
							edge.node.depth = depth + 1;
							stack.push(edge);
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
			let header;
			switch (depth) {
				case 0: {
					header = <h1>{title}</h1>;
					break;
				}
				case 1: {
					header = <h2>{title}</h2>;
					break;					
				}
				case 2: {
					header = <h3>{title}</h3>;
					break;
				}
				case 3: {
					header = <h4>{title}</h4>;
					break;
				}
				case 4: {
					header = <h5>{title}</h5>;
					break;
				}
				case 5: {
					header = <h6>{title}</h6>;
					break;
				}
				default:
					header = <b>{title}</b>;
					break;
			}
			return (
				<div style={style} key={index}>
					{header}
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
		subTree: state.subTree
	}
);

export default connect(mapStateToProps, actions)(SidebarContainer);
