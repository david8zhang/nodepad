import types from '../types';


export const postRawNotes = (wordArray) => (
	{
		type: types.POST_RAW_NOTES,
		payload: wordArray
	}
);

export const createMindMap = (sentences) => (
	{
		type: types.CREATE_MIND_MAP,
		payload: createNodes(sentences)
	}
);

const createNodes = (sentences) => [sentences];
