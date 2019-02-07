// Polyfills for older browsers
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import {Router} from 'react-router-dom';
import history from './history';
import './index.css';


ReactDOM.render(
  
  <Provider store={store}>  
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  , document.getElementById('root'));

