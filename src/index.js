import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'


import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import appReducers from './reducers'

const reducers = {
  form: formReducer,
  app: appReducers
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)


import AppContainer from './containers/AppContainer';
import Events from './utils/Events';
import Utils from './utils/Utils';
new Events();

import ClassifiedAdvertisementsContainer from './components/ClassifiedAdvertisementsContainer';
import ClassifiedAdvertisementContainer from './containers/ClassifiedAdvertisementContainer';
import ClassifiedAdvertisementFormContainer from './containers/ClassifiedAdvertisementForm';
import NotFoundPage from './components/NotFoundPage';
import SignInSignUpContainer from './components/SignInSignUpContainer';

import './index.scss';

function requireAuth(nextState, replace) {
  if (!Utils.isTokenValid()) {
    replace({
      pathname: 'classified_advertisements/1',
      state: { tokenIsInvalid: true }
    })
  }
}

ReactDOM.render(
  <Provider store={store}>
  <Router history={hashHistory}>
    <Route path='/' component={AppContainer}>
      <Route path='/classified_advertisements'>
        <IndexRedirect to='1' />
      </Route>
      <IndexRedirect to='classified_advertisements/1' />
      <Route path='classified_advertisements(/:page)(/:query)(/:category)' component={(props) => (<ClassifiedAdvertisementsContainer env='public' {...props} />)} />
      
      <Route path='admin' onEnter={requireAuth}>
        <Route path='classified_advertisements'>
          <IndexRedirect to='1' />
        </Route>
        <IndexRedirect to='classified_advertisements/1' />
        <Route path='classified_advertisements(/:page)(/:query)(/:category)' component={(props) => (<ClassifiedAdvertisementsContainer env='back' {...props} />)} />
        <Route path='classified_advertisement'>
          <Route path=':id' component={(props) => (<ClassifiedAdvertisementContainer {...props} />)}>
            <Route path='edit' component={ClassifiedAdvertisementFormContainer} />
            <Route path='delete' component={ClassifiedAdvertisementFormContainer} />
          </Route>
        </Route>
      </Route>
      
      <Route path='classified_advertisement/create' component={ClassifiedAdvertisementFormContainer} />
      <Route path='classified_advertisement'>
        <Route path=':id' component={(props) => (<ClassifiedAdvertisementContainer {...props} />)}>
          <Route path='edit' component={ClassifiedAdvertisementFormContainer} />
          <Route path='delete' component={ClassifiedAdvertisementFormContainer} />
        </Route>
      </Route>

      <Route path='signin' component={(props) => (<SignInSignUpContainer type='signin' />)} />
      <Route path='signup' component={(props) => (<SignInSignUpContainer type='signup' />)} />
      <Route path='logout' component={(props) => (<SignInSignUpContainer type='signup' />)} />
      
      <Route path='*' component={NotFoundPage}/>
    </Route>
  </Router>
  </Provider>,
  document.getElementById('root')
);
