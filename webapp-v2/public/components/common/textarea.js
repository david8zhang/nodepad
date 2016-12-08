import React from 'react';

const TextArea = (props) => (
	<div>
		<label htmlFor={props.id}>
			{props.label}
		</label>
		<textarea 
			rows={25}
			cols={100}
			id={props.id}
			className='u-full-width'
			placeholder={props.placeholder}
			value={props.value}
			onKeyDown={(e) => {
				console.log(e.keyCode);
				if (e.keyCode === 9) {
					e.preventDefault();
					props.onChange(`${props.value}\t`);
				}
			}}
			onChange={(e) => props.onChange(e.target.value)}
		/>
	</div>
);

export { TextArea };
