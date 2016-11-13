import { combineReducers } from 'redux';
import { default as noteReducer } from './note-reducer';
import { default as mindMapReducer } from './mind-map-reducer';

export default combineReducers({
	notes: noteReducer,
	mindMap: mindMapReducer
});
