import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'


import App from './components/App';
import './index.scss';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="classified_advertisements?p=1" />
      <Route path="classified_advertisements?p=:id" />
    </Route>
  </Router>,
  document.getElementById('root')
);
