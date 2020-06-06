import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import history from './constants/history';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import { Router } from 'react-router-dom';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.querySelector('#root')
);
