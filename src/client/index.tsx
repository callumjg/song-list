import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.hydrate(
  <Router>
    <App />
  </Router>,
  document.querySelector('#root')
);
