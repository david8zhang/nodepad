import React, { Component } from 'react';
import { Editor, EditorState, Modifier } from 'draft-js';
import styles from './note-editor.css';

class NoteEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty()
		};
		this.onChange = (editorState) => {
			this.setState({ editorState });
			const wordArray = this.state.editorState.getCurrentContent().getPlainText().split('\n');
			this.props.onChange(wordArray);
		};
	}

	onTab(e) {
		const tabCharacter = '	';
		e.preventDefault();

		const currentState = this.state.editorState;
		const newContentState = Modifier.replaceText(
			currentState.getCurrentContent(),
			currentState.getSelection(),
			tabCharacter
		);

		this.setState({ 
			editorState: EditorState.push(currentState, newContentState, 'insert-characters')
		});
	}

	onSubmit() {
		const wordArray = this.state.editorState.getCurrentContent().getPlainText().split('\n');
		this.props.onSubmit(wordArray);
	}

	render() {
		const { editorState } = this.state;
		return (
			<div>
				<div className={styles.noteEditor}>
					<Editor 
						editorState={editorState} 
						onChange={this.onChange}
						onTab={(e) => this.onTab(e)}
					/>
				</div>
				<div>
					<button onClick={() => this.onSubmit()}>
						Submit
					</button>
					{ this.props.children }
				</div>
			</div>
		);
	}
}

export default NoteEditor;
