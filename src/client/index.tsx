import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Router } from 'react-router-dom';
import history from './constants/history';

ReactDOM.hydrate(
  <Router history={history}>
    <App />
  </Router>,
  document.querySelector('#root')
);
