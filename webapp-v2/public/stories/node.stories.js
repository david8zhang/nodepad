import React from 'react';
import { Stage } from 'react-konva';
import { storiesOf } from '@kadira/storybook';
import { Node } from '../components';

storiesOf('Node', module)
	.add('Default node', () => (
		<Stage width={1000} height={1000}>
			<Node 
				id={1}
				size={50} 
				x={100} 
				y={200} 
				textColor='#222222'
				nodeColor='#dddddd'
				nodeOutline='#000000'
				text='hello'
			/>
		</Stage>
	))
	.add('Multiple nodes', () => (
		<Stage width={1000} height={1000}>
			<Node 
				id={1}
				size={50} 
				x={100} 
				y={200} 
				textColor='#222222'
				nodeColor='#dddddd'
				nodeOutline='#000000'
				text='hello'
			/>
			<Node
				id={2}
				size={50}
				x={200}
				y={50}
				textColor='#888888'
				nodeColor='#dddddd'
				nodeOutline='#000000'
				text='goodbye'
			/>
		</Stage>
	));
