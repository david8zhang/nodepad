import React from 'react';

const Input = (props) => (
	<div style={props.style}>
		<label htmlFor={props.id}>
			{props.label}
		</label>
		<input 
			value={props.value}
			onChange={(event) => props.onChange(event.target.value)}
			className='u-full-width' 
			type={props.type}
			placeholder={props.placeholder}
			id={props.id}
		/>
	</div>
);

export { Input };
