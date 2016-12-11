import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'


import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const reducers = {
  form: formReducer
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)


import App from './components/App';
import ClassifiedAdvertisementsContainer from './components/ClassifiedAdvertisementsContainer';
import ClassifiedAdvertisementContainer from './components/ClassifiedAdvertisementContainer';
import ClassifiedAdvertisementFormContainer from './components/ClassifiedAdvertisementContainer/ClassifiedAdvertisementFormContainer';
import NotFoundPage from './components/NotFoundPage';
import SignInSignUpContainer from './components/SignInSignUpContainer';

import './index.scss';

ReactDOM.render(
  <Provider store={store}>
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <Route path='/classified_advertisements'>
        <IndexRedirect to='1' />
      </Route>
      <IndexRedirect to='classified_advertisements/1' />
      <Route path='classified_advertisements(/:page)(/:query)(/:category)' component={(props) => (<ClassifiedAdvertisementsContainer env='public' {...props} />)} />
      
      <Route path='classified_advertisement/:id' component={(props) => (<ClassifiedAdvertisementContainer {...props} />)}>
        <Route path='edit' component={ClassifiedAdvertisementFormContainer} />
        <Route path='delete' component={ClassifiedAdvertisementFormContainer} />
      </Route>


      <Route path="signin" component={(props) => (<SignInSignUpContainer type='signin' />)} />
      <Route path="signup" component={(props) => (<SignInSignUpContainer type='signup' />)} />
      
      <Route path='*' component={NotFoundPage}/>
    </Route>
  </Router>
  </Provider>,
  document.getElementById('root')
);
