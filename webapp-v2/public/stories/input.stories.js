import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import { Input } from '../components';

class InputContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ''
		};
	}

	render() {
		return (
			<Input
				id='test input'
				placeholder='placeholder'
				value={this.state.value}
				onChange={(value) => this.setState({ value })}
				type='text'
				label='Test Input'
			/>
		);
	}
}

storiesOf('Input', module)
	.add('Default options', () => (
		<InputContainer />
	));
