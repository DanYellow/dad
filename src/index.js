import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'


import App from './components/App';
import ClassifiedAdvertisementsContainer from './components/ClassifiedAdvertisementsContainer';
import NotFoundPage from './components/NotFoundPage';

import './index.scss';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="classified_advertisements/1" />
      <Route path="classified_advertisements/:id(/:query)(/:category)" component={(props) => (<ClassifiedAdvertisementsContainer env='public' {...props} />)} />
      <Route path="classified_advertisement/:id" component={(props) => (<ClassifiedAdvertisementsContainer env='public' {...props} />)} />
      

      <Route path='*' component={NotFoundPage}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
