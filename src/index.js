import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'


import App from './components/App';
import './index.scss';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/:id" component={App}></Route>
  </Router>,
  document.getElementById('root')
);
