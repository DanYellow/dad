import React, { Component } from 'react';
import { withRouter } from 'react-router';

import APIManager from '../../utils/APIManager';


import Loader from '../Loader';

import SignIn from './SignInForm';
import SignUp from './SignInForm';

import FlashMessage from '../FlashMessage';



import './style.scss';

class SignInSignUpContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSuccess: false,
      isFailed: false,
      isLoading: false,
      errorCode: 0
    }
  }

  _handleSubmit = (values) => {
    this.setState({ isLoading: true });

    APIManager.signIn(values, this._getSignInSuccess.bind(this), this._getSignInFail.bind(this));
  }

  // _handleSubmit (values, hello, foo, gh) {
  //   console.log(values, hello, foo, gh);
  //   // this.setState({ isLoading: true });
  //   // APIManager.signIn(values, this._getSignInSuccess, this._getSignInFail.bind(this));
  // }

  _getSignInSuccess(response) {
    console.log('response', response);

    this.setState({ isSuccess: true, isLoading: false });
    window.sessionStorage.setItem('token', response.data.token);
  }

  _getSignInFail(response) {

    this.setState({ isFailed: true, isLoading: false, errorCode: response.data.flash_message.api_code });
  }

  render() {
    return (
      <div className='App'>
        { this.state.isFailed && <FlashMessage  message={ APIManager.getMessageForStatusCode(this.state.errorCode) } type='error' /> }

        { this.props.router.routes[1].path === 'signin' && <SignIn onSubmit={ this._handleSubmit }/> }
        { this.props.router.routes[1].path === 'signup' && <SignUp onSubmit={ this._handleSubmit }/> }
        { this.state.isLoading && <Loader /> }
      </div>
    );
  }
}

export default withRouter(SignInSignUpContainer);
