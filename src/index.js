import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'


import App from './components/App';
import ClassifiedAdvertisementsContainer from './components/ClassifiedAdvertisementsContainer';
import ClassifiedAdvertisementContainer from './components/ClassifiedAdvertisementContainer';
import NotFoundPage from './components/NotFoundPage';
import SignInSignUpContainer from './components/SignInSignUpContainer';

import './index.scss';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="classified_advertisements/1" />
      <Route path="classified_advertisements/:page(/:query)(/:category)" component={(props) => (<ClassifiedAdvertisementsContainer env='public' {...props} />)} />
      <Route path="classified_advertisement/:id" component={(props) => (<ClassifiedAdvertisementContainer />)} />
      
      <Route path="signin" component={(props) => (<SignInSignUpContainer type='signin' />)} />
      <Route path="signup" component={(props) => (<SignInSignUpContainer type='signup' />)} />
      
      <Route path='*' component={NotFoundPage}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
