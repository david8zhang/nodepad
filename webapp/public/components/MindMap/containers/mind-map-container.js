import React, { Component } from 'react';
import { connect } from 'react-redux';
import MindMap from '../mind-map';
import { 
	rawTreeSelector, 
	topologySelector
} from '../../../selectors';

class MindMapContainer extends Component {
	render() {
		return (
			<div>
				<h3 style={{ color: '#888888', fontSize: '15' }}>Visualize Your Notes</h3>
				<MindMap topology={this.props.topology} />
			</div>
		);
	}
}

const mapStateToProps = (state) => (
	{
		sentences: rawTreeSelector(state),
		topology: topologySelector(state)
	}
);

export default connect(mapStateToProps, null)(MindMapContainer);
