import types from '../actions/types';

const mindMapReducer = (state = null, action) => {
	switch (action.type) {
		case types.CREATE_MIND_MAP: {
			return action.payload;
		}
		default:
			return state;
	}
};

export default mindMapReducer;
