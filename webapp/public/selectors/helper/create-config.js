const createConfig = (mapping, prefixes) => {
	const maxlevel = findMaxLevel(mapping);
	const bucketAtLevel = numAtEachLevel(mapping);
	const nodes = [];
	const edges = [];
	const seen = [];
	const ymin = 60;
	const ymax = 500;
	const xmax = 500;
	const xmin = 60;
	prefixes.forEach((prefix) => {
		const levelsub = mapping[prefix[0]];
		const levelobj = mapping[prefix[2]];
		
		const ypos1 = ymin + (((ymax - ymin) * levelsub) / maxlevel);
		const ypos2 = ymin + (((ymax - ymin) * levelobj) / maxlevel);

		const xpos1 = xmin + (((xmax - xmin) * bucketAtLevel[levelsub].indexOf(prefix[0])) / bucketAtLevel[levelsub].length);
		const xpos2 = xmin + (((xmax - xmin) * bucketAtLevel[levelobj].indexOf(prefix[2])) / bucketAtLevel[levelobj].length);

		const newEdge = { name: prefix[1] };
		if (seen.indexOf(prefix[0]) === -1) {
			nodes.push({
				x: xpos1,
				y: ypos1,
				name: prefix[0]
			});		
			newEdge.source = [xpos1, ypos1];
			seen.push(prefix[0]);
		} else {
			nodes.forEach((node) => {
				if (node.name === prefix[0]) {
					newEdge.source = [node.x, node.y];
				}
			});
		}

		if (seen.indexOf(prefix[2]) === -1) {
			nodes.push({
				x: xpos2,
				y: ypos2,
				name: prefix[2]
			});
			newEdge.target = [xpos2, ypos2];
			seen.push(prefix[2]);
		} else {
			nodes.forEach((node) => {
				if (node.name === prefix[2]) {
					newEdge.target = [node.x, node.y];
				}
			});
		}
		edges.push(newEdge);
	});
	return {
		nodes,
		edges
	};
};

const numAtEachLevel = (mapping) => {
	const numAtLevel = {};
	Object.keys(mapping).forEach((key) => {
		const depth = mapping[key];
		if (Object.keys(numAtLevel).indexOf(depth.toString()) === -1) {
			numAtLevel[depth] = [key];
		} else {
			numAtLevel[depth].push(key);
		}
	});
	return numAtLevel;
};

const findMaxLevel = (mapping) => {
	let level = 0;
	Object.keys(mapping).forEach((key) => {
		if (mapping[key] > level) {
			level = mapping[key];
		}
	});
	return level;
};

export default createConfig;
