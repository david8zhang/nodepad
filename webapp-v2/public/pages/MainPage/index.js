import React, { Component } from 'react';
import { 
	CreateNodeModal,
	GraphContainer
} from './containers';
import { 
	Button 
} from '../../components'

class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowingModal: false
		};
	}
	render() {
		return (
			<div>
				<Button
					text='Create Node'
					onClick={() => this.setState({ isShowingModal: true })}
				/>
				<CreateNodeModal 
					isShowingModal={this.state.isShowingModal}
					header='Create a new Node'
					onClose={() => this.setState({ isShowingModal: false })}
				/>
				<GraphContainer />
			</div>
		);
	}
}

export default MainPage;
