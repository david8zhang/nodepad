const createTabTree = (notes, level = 0) => {
	const resultTree = {};
	if (notes.length === 0) {
		return resultTree;
	}
	for (let i = 0; i < notes.length; i++) {
		const tabCount = notes[i].split('\t').length - 1;
		if (tabCount === level) {
			const node = notes[i].substring(tabCount);
			resultTree[node] = {
				children: createTabTree(notes.slice(i + 1), level + 1)
			};
		}
		if (tabCount < level) {
			break;
		}
	}
	return resultTree;
};

export default createTabTree;
