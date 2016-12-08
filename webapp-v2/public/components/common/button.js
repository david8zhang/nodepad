import React from 'react';

const Button = (props) => (
	<button 
		style={props.style}
		className='button-primary'
		onClick={props.onClick}
	>
		{props.text}
	</button>
);

export { Button };
