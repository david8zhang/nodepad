import { createSelector } from 'reselect';
import { 
	createTabTree,
	createSentences
} from './helper';

const getWordArray = (state) => state.notes;

const getRawTree = createSelector(
	[getWordArray],
	(notes) => {
		if (!notes) {
			return null;
		}
		const rawTree = createTabTree(notes);
		const sentences = createSentences(rawTree);
		return sentences;
	}
);

export default getRawTree;
