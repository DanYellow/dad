import React, { Component } from 'react';
import { withRouter } from 'react-router';

import APIManager from '../../utils/APIManager';


import Loader from '../Loader';

import SignIn from './SignInForm';
import SignUp from './SignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm';

import FlashMessage from '../FlashMessage';



import './style.scss';

class SignInSignUpContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSuccess: false,
      hasErrors: false,
      isLoading: false,
      APIResponseCode: 0
    }
  }

  _handleSubmit = (values) => {
    this.setState({ isLoading: true, hasErrors: false });

    if (this.props.router.routes[1].path === 'signin') {
      APIManager.signIn(values, this._signInSuccess.bind(this), this._apiCallFail.bind(this));
    } else if (this.props.router.routes[1].path === 'signup') {
      APIManager.signUp(values, this._signUpSuccess.bind(this), this._apiCallFail.bind(this));
    } else if (this.props.router.routes[1].path === 'forgot_password') {
      APIManager.forgotPassword(values, this._signUpSuccess.bind(this), this._apiCallFail.bind(this));
    } else {
      this.setState({ isSuccess: true, isLoading: false})
    }
  }

  _signInSuccess(response) {
    this.setState({ isSuccess: true, isLoading: false, APIResponseCode: response.data.flash_message.api_code });
    this._redirectUser('/classified_advertisements/1');

    window.localStorage.setItem('token', response.data.resource.token);
    window.localStorage.setItem('token_expire_date', response.data.resource.expire);
  }

  _signUpSuccess(response) {
    this.setState({ isSuccess: true, isLoading: false, APIResponseCode: response.data.flash_message.api_code });
  }

  _forgotPasswordSuccess(response) {
    this.setState({ isSuccess: true, isLoading: false, APIResponseCode: response.data.flash_message.api_code });
  }

  _apiCallFail(response) {
    this.setState({ hasErrors: true, isLoading: false, APIResponseCode: response.data.flash_message.api_code });
  }


  _handleClick = (e) => {
    this.setState({ hasErrors: false });
  }

  _redirectUser = (url) => {
    let { router } = this.props;

    setTimeout(() => {
      router.push(url);
    }, 2500);
  }

  render() {
    return (
      <div className='App'>
        { this.state.hasErrors && <FlashMessage message={ APIManager.getMessageForStatusCode(this.state.APIResponseCode) } type='error' onClick={ this._handleClick } /> }
        { this.state.isSuccess && <FlashMessage message={ APIManager.getMessageForStatusCode(this.state.APIResponseCode) } type='success' onClick={ this._handleClick } /> }

        { this.props.router.routes[1].path === 'signin' && <SignIn onSubmit={ this._handleSubmit }/> }
        { this.props.router.routes[1].path === 'signup' && <SignUp onSubmit={ this._handleSubmit }/> }
        { this.props.router.routes[1].path === 'forgot_password' && <ForgotPasswordForm onSubmit={ this._handleSubmit }/> }
        { this.state.isLoading && <Loader /> }
      </div>
    );
  }
}

export default withRouter(SignInSignUpContainer);
