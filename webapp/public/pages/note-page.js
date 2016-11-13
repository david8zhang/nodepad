import React, { Component } from 'react';
import { 
	NoteEditorContainer,
	MindMapContainer
} from '../components';

class NotePage extends Component {
	render() {
		return (
			<div>
				<NoteEditorContainer />
				<MindMapContainer />
			</div>
		);
	}
}

export default NotePage;
