import React, { Component } from 'react';
import { connect } from 'react-redux';
import { default as countEnhancer } from './count-enhancer';
import { evenCountSelector } from '../../../selectors';
import * as actions from '../../../actions';

const evenCountEnhancer = (CounterContainer) => {
	class EvenCountEnhanced extends Component {
		render() {
			return (
				<CounterContainer 
					{...this.props}
					{...this.state}
				/>
			);
		}
	}

	const mapStateToProps = (state) => (
		{ evenCount: evenCountSelector(state) }
	);

	return connect(mapStateToProps, actions)(countEnhancer(EvenCountEnhanced));
};

export default evenCountEnhancer;
