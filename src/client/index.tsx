import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import history from './constants/history';
import App from './components/App';
import { Router } from 'react-router-dom';

ReactDOM.hydrate(
  <Router history={history}>
    <App />
  </Router>,
  document.querySelector('#root')
);
