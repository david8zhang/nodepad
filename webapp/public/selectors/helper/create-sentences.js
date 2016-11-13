const createSentences = (tree) => {
	const sentences = [];
	const queue = [];
	if (Object.keys(tree).length > 1) {
		queue.push({
			value: {
				'': {
					children: tree
				}
			},
			depth: -1,
			subject: undefined
		});
	} else {
		queue.push({
			value: tree,
			depth: 0,
			subject: Object.keys(tree)[0]
		});
	}
	while (queue.length > 0) {
		const node = queue.shift();
		if (!node.value) {
			break;
		}
		const key = Object.keys(node.value)[0];
		try {
			const children = node.value[key].children;
			if (children) {
				Object.keys(children).forEach((child) => {
					queue.push({
						value: {
							[child]: children[child]
						},
						depth: node.depth + 1,
						subject: child
					});
					sentences.push(`${key} ${child}`);
				});					
			}
		} catch (e) {
			console.log(e);
		}
	}
	return sentences;
};

export default createSentences;
