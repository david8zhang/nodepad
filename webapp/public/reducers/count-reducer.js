import { default as types } from '../actions/types';

const countReducer = (state = 0, action) => {
	switch (action.type) {
		case types.ADD_COUNT:
			return state + 1;
		case types.DEC_COUNT:
			return state - 1;
		default:
			return state;
	}
};

export default countReducer;
