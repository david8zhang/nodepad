import React, { Component } from 'react';
import { connect } from 'react-redux';
import MindMap from '../mind-map';
import { rawTreeSelector } from '../../../selectors';

class MindMapContainer extends Component {
	render() {
		return (
			<MindMap />
		);
	}
}

const mapStateToProps = (state) => (
	{
		sentences: rawTreeSelector(state)
	}
);

export default connect(mapStateToProps, null)(MindMapContainer);
