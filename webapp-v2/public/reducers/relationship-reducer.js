import types from '../actions/types';

export default (state = null, action) => {
	switch (action.type) {
		case types.ADD_REL_SRC: {
			return action.payload.id;
		}
		case types.CLEAR_SRC_ID: {
			return null;
		}
		default:
			return state;
	}
};
