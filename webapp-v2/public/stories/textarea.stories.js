import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import { TextArea } from '../components';

class TextAreaContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ''
		};
	}

	render() {
		return (
			<TextArea
				id='textarea test'
				label='Test TextArea'
				onChange={(value) => this.setState({ value })}
				placeholder='Test Textarea'
				value={this.state.value}
			/>
		);
	}
}

storiesOf('TextArea', module)
	.add('Default options', () => (
		<TextAreaContainer />
	));
