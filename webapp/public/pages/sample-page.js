import React, { Component } from 'react';
import { 
	CounterContainerDefault,
	EvenCountEnhancer
} from '../components';

class SamplePage extends Component {
	render() {
		const EnhancedCounterContainer = EvenCountEnhancer(CounterContainerDefault);
		return (
			<div>
				<h2>Sample Serverside Rendering Example</h2>
				<EnhancedCounterContainer />
			</div>
		);
	}
}

export default SamplePage;
