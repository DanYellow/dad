import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'


import App from './components/App';
import './index.scss';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path=":id" />
    </Route>
  </Router>,
  document.getElementById('root')
);
