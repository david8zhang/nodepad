/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { rootReducer } from './reducers';

const config = {
	apiKey: 'AIzaSyBectiofm6v4m3R4UoedIncbqFRtOITlvU',
	authDomain: 'nodepad-ecd25.firebaseapp.com',
	databaseURL: 'https://nodepad-ecd25.firebaseio.com',
	storageBucket: 'nodepad-ecd25.appspot.com',
	messagingSenderId: '818080612824'
};
firebase.initializeApp(config);

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>
  , document.querySelector('.container'));
