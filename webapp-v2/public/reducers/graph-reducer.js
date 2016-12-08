import { List } from 'immutable';
import types from '../actions/types';

const initialState = List();

export default (state = initialState, action) => {
	switch (action.type) {
		case types.CREATE_NODE: {
			return state.push(action.payload);
		}
		case types.MOVE_NODE: {
			const list = state.toJS();
			let modifiedNode;
			let modifiedIndex = 0;
			list.forEach((node, index) => {
				if (node.id === action.payload.nodeId) {
					modifiedIndex = index;
					modifiedNode = JSON.parse(JSON.stringify(node));
					modifiedNode.x = action.payload.pos[0];
					modifiedNode.y = action.payload.pos[1];
				}
			});
			return state.update(modifiedIndex, () => modifiedNode);			
		}
		default:
			return state;
	}
};
