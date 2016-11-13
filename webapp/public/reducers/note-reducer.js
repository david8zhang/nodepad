import types from '../actions/types';

const initialState = null;

const noteReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.POST_RAW_NOTES: {
			return action.payload;
		}
		default: 
			return state;
	}
};

export default noteReducer;
