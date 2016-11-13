import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import NoteEditor from '../note-editor';
import { rawTreeSelector } from '../../../selectors';
import * as actions from '../../../actions';

class NoteEditorContainer extends Component {
	
	onSubmit() {
		console.log('Submitted!', this.props.notes);
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
			console.log('Response', res);
		})
		.catch((err) => {
			console.log('Error', err);
		});
		// if (this.props.sentences) {
		// 	this.props.createMindMap(this.props.sentences);
		// }
	}

	render() {
		return (
			<div>
				<NoteEditor 
					onSubmit={() => this.onSubmit()}
					onChange={(wordArray) => this.props.postRawNotes(wordArray)}
				>
					<button onClick={() => this.createMindMap()}>
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
