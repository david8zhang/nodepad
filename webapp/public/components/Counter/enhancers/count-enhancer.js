import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

const countEnhancer = (CounterContainer) => {
	class CountEnhancer extends Component {
		render() {
			const addCount = this.props.addCount;
			const decCount = this.props.decCount;
			return (
				<CounterContainer 
					{...this.props}
					{...this.state}
					addCount={addCount}
					decCount={decCount}
				/>
			);
		}
	}
	const mapStateToProps = (state) => (
		{ count: state.count }
	);
	return connect(mapStateToProps, actions)(CountEnhancer);
};

export default countEnhancer;
