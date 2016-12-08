import types from './types';

/**
 * Create a new root node
 * @param  {Object} node The JSON object corresponding to the node datastructure
 * @return {Object}      An action to be handed to the reducer
 */
export const createNode = (node) => (
	{
		type: types.CREATE_NODE,
		payload: node
	}
);

/**
 * Update a node's position given its id and new position
 * @param  {Array} pos    An array describing the node's new position (x, y)
 * @param  {String} nodeId The id of the node
 * @return {Object}        An object to be passed to reducer
 */
export const moveNode = (pos, nodeId) => (
	{
		type: types.MOVE_NODE,
		payload: { pos, nodeId }
	}
);
