import React, { Component } from 'react';
import { default as sample } from '../../selectors/sample';

class IndexPage extends Component {
	render() {
		sample();
		return (
			<div>
				{
					this.props.children ||
					<div>Home page under construction</div>
				}
			</div>
		);
	}
}

export default IndexPage;
