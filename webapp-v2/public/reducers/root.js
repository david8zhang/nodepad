import { combineReducers } from 'redux';
import graphReducer from './graph-reducer';
import sidebarReducer from './sidebar-reducer';

export default combineReducers({
	nodes: graphReducer,
	subTree: sidebarReducer
});
