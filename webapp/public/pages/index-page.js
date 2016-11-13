import React, { Component } from 'react';

class IndexPage extends Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

export default IndexPage;
