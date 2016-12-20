import types from './types';
import { fetchNodes } from '../lib';

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

/**
 * Set the currently examining subtree to be the node
 * @param  {Object} node The root node in question
 * @return {None}      
 */
export const selectSubtree = (node) => (
	{
		type: types.SELECT_SUBTREE,
		payload: node
	}
);

/**
 * Get the nodes for a given topic id
 * @param  {String} topicId the id of the topic to get nodes for
 * @return {Object}         The action to be passed to the reducer
 */
export const getNodes = (topicId) => {
	const request = fetchNodes(topicId);
	return {
		type: types.FETCH_NODES,
		payload: request
	};
};

/**
 * Add the child to the parent's edge list
 * @param  {Object} parent The parent object
 * @param  {Object} child  The child object
 * @return {Object}        The action to be passed to the reducer
 */
export const addChild = (parent, child) => (
	{
		type: types.ADD_CHILD,
		payload: { parent, child }
	}
);


/**
 * Delete the node corresponding to that id
 * @param  {String} id The id of the node
 * @return {Object}    An action to be passed to reducer
 */
export const deleteNode = (id) => (
	{
		type: types.DELETE_NODE,
		payload: { id }
	}
);
		
/**
 * Set the source node in a relationship between two non-related nodes
 * @param {String} id The id of the source node
 */
export const addRelSrc = (id) => (
	{
		type: types.ADD_REL_SRC,
		payload: { id }
	}
);

/**
 * Clear the current source ide
 * @return {Object} An empty payload
 */
export const clearSrcId = () => (
	{
		type: types.CLEAR_SRC_ID,
		payload: {}
	}
);

/**
 * Add a relationship between the source and destination nodes
 * @param  {Object} src  The source node
 * @param  {Object} dest The destination node
 * @return {Object}      The action to be passed to the reducer
 */
export const addRelationship = (srcId, dest) => (
	{
		type: types.ADD_RELATIONSHIP,
		payload: { srcId, dest }
	}
);
