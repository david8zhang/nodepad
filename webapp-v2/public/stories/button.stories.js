import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Button } from '../components';

storiesOf('Button', module)
	.add('Default options', () => (
		<Button 
			text='Button' 
			onClick={() => console.log('clicked!')}
		/>
	));
