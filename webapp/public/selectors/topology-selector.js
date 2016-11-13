import { createSelector } from 'reselect';
import {
	createLevelMapping,
	createConfig
} from './helper';

const getMindMap = (state) => state.mindMap;

const getTopology = createSelector(
	[getMindMap],
	(mindMap) => {
		if (!mindMap) {
			return null;
		}
		const levelMapping = createLevelMapping(mindMap);
		const config = createConfig(levelMapping, mindMap);
		return config;
	}
);

export default getTopology;
