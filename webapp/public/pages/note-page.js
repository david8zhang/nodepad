import React, { Component } from 'react';
import { 
	NoteEditorContainer,
	MindMapContainer
} from '../components';

class NotePage extends Component {
	render() {
		return (
			<div>
				<div style={{ paddingTop: '20px' }}>
					<div className='small-12 large-6 columns'>
						<NoteEditorContainer />
					</div>
					<div className='small-12 large-6 columns'>
						<MindMapContainer />
					</div>
				</div>
			</div>
		);
	}
}

export default NotePage;
