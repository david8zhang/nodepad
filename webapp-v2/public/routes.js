import React from 'react';
import { Route } from 'react-router';

/** Pages within the app */
import { 
	IndexPage,
	MainPage
} from './pages';

export default (
	<Route path='/' component={IndexPage}>
		<Route path='node' component={MainPage} />
	</Route>
);
