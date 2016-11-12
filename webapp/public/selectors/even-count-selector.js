import { createSelector } from 'reselect';

const getCount = (state) => state.count;

const getEvenCount = createSelector(
	[getCount],
	(count) => {
		if (count % 2 === 0) {
			return true;
		}
		return false;
	}
);

export default getEvenCount;
