import { Map } from 'immutable';
import types from '../actions/types';

const initialState = Map({});

export default (state = initialState, action) => {
	switch (action.type) {
		case types.CREATE_NODE: {
			return state.set(action.payload.id, action.payload);
		}
		case types.MOVE_NODE: {	
			const map = state.toJS();
			const modifiedNode = JSON.parse(JSON.stringify(map[action.payload.nodeId]));
			modifiedNode.x = action.payload.pos[0];
			modifiedNode.y = action.payload.pos[1];
			return state.update(action.payload.nodeId, () => modifiedNode);
		}
		case types.FETCH_NODES: {
			return state.merge(Map(action.payload));
		}
		case types.ADD_CHILD: {
			const { parent, child } = action.payload;

			// Add a new edge to the parent edge set
			const parentNode = JSON.parse(JSON.stringify(state.toJS()[parent.id]));
			let parentEdgeSet = parentNode.edges;
			if (!parentEdgeSet) {
				parentEdgeSet = [];
			}
			parentEdgeSet = parentEdgeSet.concat({
				title: 'PARENT',
				node: child.id
			});
			parentNode.edges = parentEdgeSet;
			const newState = state.update(parent.id, () => parentNode);

			// Add a new edge to the child edge set and add the child node itself
			// to the list of nodes
			let childEdgeSet = child.edges;
			if (!childEdgeSet) {
				childEdgeSet = [];
			}
			childEdgeSet = childEdgeSet.concat({
				title: 'CHILD',
				node: parent.id
			});
			child.edges = childEdgeSet;
			return newState.set(child.id, child);
		}
		default:
			return state;
	}
};
