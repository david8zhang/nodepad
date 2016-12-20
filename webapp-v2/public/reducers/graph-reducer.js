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
		case types.ADD_RELATIONSHIP: {
			const { srcId, dest } = action.payload;

			// Add a new edge to both the source and edge set
			const srcNode = JSON.parse(JSON.stringify(state.toJS()[srcId]));
			let srcNodeEdgeSet = srcNode.edges;
			if (!srcNode.edges) {
				srcNodeEdgeSet = [];
			}
			srcNodeEdgeSet = srcNodeEdgeSet.concat({
				title: 'RELATION',
				node: dest.id
			});
			srcNode.edges = srcNodeEdgeSet;
			const newState = state.update(srcId, () => srcNode);

			// Add a new edge to the dest edge set
			let destEdgeSet = dest.edges;
			if (!destEdgeSet) {
				destEdgeSet = [];
			}
			destEdgeSet = destEdgeSet.concat({
				title: 'RELATION DEST',
				node: srcId
			});
			dest.edges = destEdgeSet;
			return newState.set(dest.id, dest);
		}
		default:
			return state;
	}
};
