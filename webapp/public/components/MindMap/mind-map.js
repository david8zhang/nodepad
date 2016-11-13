import React, { Component } from 'react';
import { Layer, Stage } from 'react-konva';
import Edge from '../Edge/edge';
import Node from '../Node/node';
import Label from '../Label/label';
import styles from './mind-map.css';

class MindMap extends Component {
	renderMindMapNodes() {
		const nodes = [];
		this.props.topology.nodes.forEach((node) => {
			nodes.push(
				<Node x={node.x} y={node.y} name={node.name} size={20} />
			);
		});

		return nodes;
	}

	renderMindMapEdges() {
		const edges = []; 
		this.props.topology.edges.forEach((edge) => {
			edges.push(
				<Edge 
					points={[
						edge.source[0],
						edge.source[1],
						edge.target[0],
						edge.target[1]
					]}
				/>
			);
		});
		return edges;
	}

	renderMindMapLabels() {
		const labels = [];
		this.props.topology.edges.forEach((edge) => {
			const midx = (edge.source[0] + edge.target[0]) / 2;
			const midy = (edge.source[1] + edge.target[1]) / 2;
			labels.push(
				<Label x={midx} y={midy} text={edge.name} fontSize={6.5} padding={6} />
			);
		});
		this.props.topology.nodes.forEach((node) => {
			labels.push(
				<Label x={node.x - 30} y={node.y - 40} text={node.name} fontSize={6.5} padding={6} /> 
			);
		});
		return labels;
	}


	render() {
		return (
			<div className={styles.mindMap}>
				<Stage width={600} height={600}>
					<Layer>
						{ this.props.topology && this.renderMindMapNodes() }
						{ this.props.topology && this.renderMindMapEdges() }
						{ this.props.topology && this.renderMindMapLabels() }
					</Layer>
				</Stage>
			</div>
		);
	}
}

export default MindMap;
