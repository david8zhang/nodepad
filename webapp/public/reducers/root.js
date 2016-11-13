import { combineReducers } from 'redux';
import { default as noteReducer } from './note-reducer';

export default combineReducers({
	notes: noteReducer
});
