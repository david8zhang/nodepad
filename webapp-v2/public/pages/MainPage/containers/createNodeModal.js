/* global localStorage */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import * as actions from '../../../actions';
import {
	createNode
} from '../../../lib';
import {
	Input,
	TextArea,
	Button
} from '../../../components';

const uuidV1 = require('uuid/v1');

class CreateNodeModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			text: '',
			x: 0,
			y: 0,
			edges: []
		};
	}

	onSubmit() {
		const node = {
			id: uuidV1(),
			...this.state
		};
		this.props.createNode(node);
		let topicId;
		if (localStorage.getItem('topic_id')) {
			topicId = localStorage.getItem('topic_id');
		}
		createNode(node, topicId).then((ref) => {
			if (!localStorage.getItem('topic_id')) {
				localStorage.setItem('topic_id', ref.toString());
			}
			this.setState({
				title: '',
				text: '',
				x: 0,
				y: 0,
				edges: []
			});
			this.props.onClose();
		}).catch((err) => {
			console.log('Error!', err);
		});
	}

	render() {
		return (
			this.props.isShowingModal &&
			<ModalContainer onClose={this.props.onClose}>
				<ModalDialog onClose={this.props.onClose}>
					<h1>{this.props.header}</h1>
					<Input
						id='nodeTitle'
						value={this.state.title}
						placeholder='Enter a new Title'
						onChange={(title) => this.setState({ title })}
						label='Title'
						type='text'
					/>
					<TextArea
						id='nodeText'
						value={this.state.text}
						placeholder='Enter some Text'
						onChange={(text) => this.setState({ text })}
						label='Notes'
					/>
					<Button
						text='Create Node'
						onClick={() => this.onSubmit()}
					/>
				</ModalDialog>
			</ModalContainer>
		);
	}
}

export default connect(null, actions)(CreateNodeModal);
