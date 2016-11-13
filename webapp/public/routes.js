import React from 'react';
import { Route } from 'react-router';

/** Containers */
import { 
	IndexPage,
	NotePage
} from './pages';

export default (
	<Route path='/' component={IndexPage}>
		<Route path='notes' component={NotePage} />
	</Route>
);
