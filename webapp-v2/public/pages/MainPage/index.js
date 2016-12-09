/* global localStorage */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	CreateNodeModal,
	GraphContainer,
	SidebarContainer
} from './containers';
import * as actions from '../../actions';

import { createNode, addChild } from '../../lib';
import { Button } from '../../components';

const uuidV1 = require('uuid/v1');

class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowingModal: false,
			showChildModal: false
		};
	}

	/**
	 * Create a new node
	 * @param {[type]} node [description]
	 */
	addNode(node) {
		const newNode = {
			id: uuidV1(),
			...node
		};
		this.props.createNode(newNode);
		let topicId;
		if (localStorage.getItem('topic_id')) {
			topicId = localStorage.getItem('topic_id');
		}
		createNode(newNode, topicId).then((ref) => {
			if (!localStorage.getItem('topic_id')) {
				localStorage.setItem('topic_id', ref.toString());
			}
			this.setState({
				isShowingModal: false
			});
		}).catch((err) => {
			console.log('Error!', err);
		});
	}

	/**
	 * Add a new child
	 * @param {Object} node The child node to be added
	 * @param {Object} Parent The parent node to add a child to
	 */
	addChild(node, parent) {
		const child = {
			id: uuidV1(),
			...node
		};
		this.props.addChild(parent, child);
		const topicId = localStorage.getItem('topic_id');
		addChild(child, parent, topicId).then(() => {
			console.log('Hello!');
			this.setState({
				showChildModal: false
			});
		}).catch((err) => console.log('error!', err));
	}

	render() {
		return (
			<div className='row'>
				<div className='three columns'>
					<SidebarContainer />
				</div>
				<div className='nine columns'>
					<Button
						text='Create Node'
						onClick={() => this.setState({ isShowingModal: true })}
					/>
					<CreateNodeModal 
						isShowingModal={this.state.isShowingModal}
						onSubmit={(node) => this.addNode(node)}
						header='Create a new Node'
						onCancel={() => this.setState({ isShowingModal: false })}
					/>
					<GraphContainer 
						onAddChild={(node, parent) => this.addChild(node, parent)}
						showChildModal={this.state.showChildModal}
						toggleModal={() => this.setState({ showChildModal: true })}
						onClose={() => this.setState({ showChildModal: false })}
					/>
				</div>
			</div>
		);
	}
}

export default connect(null, actions)(MainPage);
