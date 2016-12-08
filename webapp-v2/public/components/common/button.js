import React from 'react';

const Button = (props) => (
	<button 
		className='button-primary'
		onClick={props.onClick}
	>
		{props.text}
	</button>
);

export { Button };
