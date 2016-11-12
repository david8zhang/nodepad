import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Counter } from '../index';

const customCount = <h3><em>5</em></h3>;

storiesOf('Counter', module)
	.add('Default Options', () => (
		<Counter count={5} />
	))
	.add('Custom Options', () => (
		<Counter count={customCount} />
	));
