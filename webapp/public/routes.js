import React from 'react';
import { Route } from 'react-router';

/** Containers */
import { 
	SamplePage,
	IndexPage
} from './pages';

export default (
	<Route path='/' component={IndexPage}>
		<Route path='sample' component={SamplePage} />
	</Route>
);
