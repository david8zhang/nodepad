import { combineReducers } from 'redux';
import { default as countReducer } from './count-reducer';

export default combineReducers({
	count: countReducer
});
