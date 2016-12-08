/* global localStorage */
import React, { Component } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import {
	Input,
	TextArea,
	Button
} from '../../../components';

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
		this.props.onSubmit(this.state);
		this.setState({
			title: '',
			text: '',
			x: 0,
			y: 0,
			edges: []
		});
	}

	render() {
		return (
			this.props.isShowingModal &&
			<ModalContainer onClose={this.props.onClose}>
				<ModalDialog>
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
					<Button
						style={{ 
							marginLeft: '10px', 
							backgroundColor: '#d32f2f',
							borderColor: '#d32f2f'
						}}
						text='Cancel'
						onClick={() => this.props.onCancel()}
					/>
				</ModalDialog>
			</ModalContainer>
		);
	}
}

export default CreateNodeModal;
