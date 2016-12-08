import React, { Component } from 'react';
import { 
	CreateNodeModal,
	GraphContainer,
	SidebarContainer
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
						header='Create a new Node'
						onClose={() => this.setState({ isShowingModal: false })}
					/>
					<GraphContainer />
				</div>
			</div>
		);
	}
}

export default MainPage;
