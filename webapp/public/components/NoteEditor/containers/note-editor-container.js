import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import NoteEditor from '../note-editor';
import { rawTreeSelector } from '../../../selectors';
import * as actions from '../../../actions';
import * as lib from '../../../lib';

class NoteEditorContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowingModal: false
		};
	}

	onSubmit() {
		this.setState({
			isShowingModal: true
		});
	}

	createMindMap() {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Ocp-Apim-Subscription-Key': '6de09bd091c04651ba0b171bf78a12ae'
			}
		};

		let para = '';
		this.props.sentences.forEach((sentence, index) => {
			if (index === this.props.sentences.length - 1) {
				para += `${sentence} .`;
			} else {
				para += `${sentence} . `;
			}
		});
		axios.post('https://api.projectoxford.ai/linguistics/v1.0/analyze', {
			language: 'en',
			analyzerIds: ['22a6b758-420f-4745-8a3c-46835a67c0d2'],
			text: para
		}, config)
		.then((res) => {
			const prefixes = lib.formatSyntaxTree(res.data[0].result, this.props.sentences);
			this.props.createMindMap(prefixes);
			this.props.logResult(res.data[0].result);
		})
		.catch((err) => {
			console.log('Error', err);
		});
	}

	handleClick = () => this.setState({isShowingModal: true})
  	handleClose = () => this.setState({isShowingModal: false})

	render() {
		return (
			<div>
				<div onClick={this.handleClick}>
			      {
			        this.state.isShowingModal &&
			        <ModalContainer onClose={this.handleClose}>
			          <ModalDialog onClose={this.handleClose}>
			          	  <label>Please enter your phone number.</label>
					      <input type="text" placeholder="(123)-456-7890" />
					      <button className='success button' onClick={this.handleClose}>
					      	Submit
					      </button>
			          </ModalDialog>
			        </ModalContainer>
			      }
			    </div>
				<h3 style={{ color: '#888888', fontSize: '15' }}>Write Your Notes</h3>
				<NoteEditor 
					onSubmit={() => this.onSubmit()}
					onChange={(wordArray) => this.props.postRawNotes(wordArray)}
				>
					<button 
						style={{ marginTop: '5px', width: '100%' }}
						className='success button' 
						onClick={() => this.createMindMap()}
					>
						Create Mind Map
					</button>
				</NoteEditor>
			</div>
		);
	}
}

const mapStateToProps = (state) => (
	{
		sentences: rawTreeSelector(state),
		notes: state.notes
	}
);

export default connect(mapStateToProps, actions)(NoteEditorContainer);
