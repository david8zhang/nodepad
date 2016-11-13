const createLevelMapping = (mindMapPrefixes) => {
	const map = {};
	mindMapPrefixes.forEach((prefix) => {
		if (Object.keys(map).indexOf(prefix[0]) === -1) {
			map[prefix[0]] = 0;
			map[prefix[2]] = 1;
		} else {
			map[prefix[2]] = map[prefix[0]] + 1;
		}
	});
	return map;
};

export default createLevelMapping;
