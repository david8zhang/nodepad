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
	const newNode = node;
	newNode.edges = JSON.stringify(node.edges);
	let newNodeRef;
	if (topicid == null) {
		newNodeRef = firebase.database().ref('topics').push();
		return newNodeRef.set({
			nodes: [newNode]
		}).then(() => newNodeRef.key);
	}
	newNodeRef = firebase.database().ref(`topics/${topicid}`);
	return newNodeRef.once('value').then((snapshot) => {
		const nodes = snapshot.val().nodes;
		const newNodes = nodes.concat(newNode);
		newNodeRef.set({
			nodes: newNodes
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
		let newNode;
		let modifiedIndex;
		nodes.forEach((node, index) => {
			if (node.id === nodeId) {
				modifiedIndex = index;
				newNode = {
					...node
				};
				newNode.x = pos[0];
				newNode.y = pos[1];
			}
		});
		nodes[modifiedIndex] = newNode;
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
