import React from 'react';

const TextArea = (props) => (
	<div>
		<label htmlFor={props.id}>
			{props.label}
		</label>
		<textarea 
			id={props.id}
			className='u-full-width'
			placeholder={props.placeholder}
			value={props.value}
			onKeyDown={(e) => {
				if (e.keyCode === 9) {
					e.preventDefault();
					props.onChange(`${props.value}	`);
				}
			}}
			onChange={(e) => props.onChange(e.target.value)}
		/>
	</div>
);

export { TextArea };
