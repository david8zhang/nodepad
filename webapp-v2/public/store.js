import promise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStoreWithMiddleware(rootReducer);

export { store };
