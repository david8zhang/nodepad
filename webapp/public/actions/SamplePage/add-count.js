import { default as types } from '../types';

/**
 * An action dispatch that increments the counter
 * @return {Object} An action object to be passed to the requisite reducer
 */
const addCount = () => (
	{
		type: types.ADD_COUNT,
		payload: 1
	}
);

export default addCount;
