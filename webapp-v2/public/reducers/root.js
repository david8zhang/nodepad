import { combineReducers } from 'redux';
import graphReducer from './graph-reducer';
import sidebarReducer from './sidebar-reducer';
import relationshipReducer from './relationship-reducer';

export default combineReducers({
	nodes: graphReducer,
	subTree: sidebarReducer,
	relSrcId: relationshipReducer
});
