import firebase from 'firebase';

/** @type {Object} configuration for firebase */
const fbconf = {
	apiKey: 'AIzaSyBMlgqFadOQKT5COJkbuFg3gNSOgynKr44',
	authDomain: 'nodepad-aeefe.firebaseapp.com',
	databaseURL: 'https://nodepad-aeefe.firebaseio.com',
	storageBucket: 'nodepad-aeefe.appspot.com',
	messagingSenderId: '882298864820'
};

firebase.initializeApp(fbconf);

/**
 * Create a new node in the firebase topics reference
 * @param  {Object} node    the node object to add to the topic's nodes
 * @param  {String} topicid the topic id, or  null if there is none
 * @return {Promise}        A promise corresponding to a firebase write
 */
export const createNode = (node, topicid = null) => {
	let newNodeRef;
	if (topicid == null) {
		newNodeRef = firebase.database().ref('topics').push();
		return newNodeRef.set({
			nodes: {
				[node.id]: node
			}
		}).then(() => newNodeRef.key);
	}
	newNodeRef = firebase.database().ref(`topics/${topicid}`);
	return newNodeRef.once('value').then((snapshot) => {
		const nodes = snapshot.val().nodes;
		nodes[node.id] = node;
		newNodeRef.set({
			nodes
		});
	}).then(() => newNodeRef.key);
};

/**
 * Move the node with the given nodeId to a new position
 * @param  {Array} pos     The [x, y] position of the node
 * @param  {String} nodeId  The id of the node to move
 * @param  {String} topicid The id of the topic that contains this node
 * @return {Promise}         a promise corresponding to a firebase write
 */
export const moveNode = (pos, nodeId, topicid) => {
	const newNodeRef = firebase.database().ref(`topics/${topicid}`);
	return newNodeRef.once('value').then((snapshot) => {
		const nodes = snapshot.val().nodes;
		const oldNode = nodes[nodeId];
		const newNode = {
			...oldNode
		};
		newNode.x = pos[0];
		newNode.y = pos[1];
		nodes[nodeId] = newNode;
		newNodeRef.set({
			nodes
		});
	}).then(() => newNodeRef.key);
};

/**
 * Fetch the nodes for the given topicId
 * @param  {String} topicId the id of the topic to fetch the nodes for
 * @return {Promise}        a promise corresponding to the firebase get operation
 */
export const fetchNodes = (topicId) => {
	const getNodeRef = firebase.database().ref(`topics/${topicId}`);
	return getNodeRef.once('value').then((snapshot) => {
		const nodes = snapshot.val().nodes;
		return nodes;
	});
};

/**
 * Add a child to the given parent node
 * @param  {Object} child   The child node to be added
 * @param  {Object} parent  The parent to add the child node to
 * @param  {String} topicId the id of the topic that contains the parent node
 * @return {Promise}         A promise corresponding to a put and fetch event
 */
export const addChild = (child, parent, topicId) => {
	const getNodeRef = firebase.database().ref(`topics/${topicId}`);
	return getNodeRef.once('value').then((snapshot) => {
		// Add the child to the parent edge set
		const nodes = snapshot.val().nodes;
		const parentNode = nodes[parent.id];
		let parentEdgeSet = parentNode.edges;
		if (!parentEdgeSet) {
			parentEdgeSet = [];
		}
		parentNode.edges = parentEdgeSet.concat({
			title: 'PARENT',
			node: child.id
		});
		nodes[parent.id] = parentNode;
		getNodeRef.set({
			nodes
		});

		// Add the parent to the child edge set and then 
		// add the node itself
		let childEdgeSet = child.edges;
		const newChild = JSON.parse(JSON.stringify(child));
		if (!childEdgeSet) {
			childEdgeSet = [];
		}
		childEdgeSet = childEdgeSet.concat({
			title: 'CHILD',
			node: parent.id
		});
		newChild.edges = childEdgeSet;
		return createNode(newChild, topicId);
	});
};

/**
 * Add an arbitrary relationship between the given src and dest nodes
 * @param  {Object} src     The source node
 * @param  {Object} dest    The destination node
 * @param  {String} topicId The topic that all these nodes belong to
 * @return {Promise}         A promise corresponding to a put and fetch event
 */
export const addRelationship = (srcId, dest, topicId) => {
	const getNodeRef = firebase.database().ref(`topics/${topicId}`);
	return getNodeRef.once('value').then((snapshot) => {
		const nodes = snapshot.val().nodes;
		const srcNode = nodes[srcId];
		const destNode = nodes[dest.id];

		// Add the edge to the src edge set
		let srcEdgeSet = srcNode.edges;
		if (!srcEdgeSet) {
			srcEdgeSet = [];
		}
		srcNode.edges = srcEdgeSet.concat({
			title: 'RELATION',
			node: dest.id
		});
		nodes[srcId] = srcNode;

		// Add the edge to the dest edge set
		let destEdgeSet = destNode.edges;
		if (!destEdgeSet) {
			destEdgeSet = [];
		}
		destNode.edges = destEdgeSet.concat({
			title: 'RELATION DEST',
			node: dest.id
		});
		nodes[dest.id] = destNode;
		getNodeRef.set({
			nodes
		});
	});
}
