import React, { Component } from 'react';
import { withRouter } from 'react-router';

import APIManager from '../../../utils/APIManager';

import Loader from '../../Loader';

import './style.scss';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameInputValue: '',
      passwordInputValue: ''
    }
  }

  _onSubmit(e) {
    e.preventDefault();

    
  }

  _inputValueChange(e) {
    const stateKey = e.target.getAttribute('name') + 'InputValue';
    this.setState({ [stateKey]: e.target.value });
  }

  render() {
    return (
      <div className='SignIn'>
        <h2 id='title' className='bordered-title'>Les dernières annonces</h2>
        <form onSubmit={ (e) => this._onSubmit(e) } className='form'>
        <fieldset>
          <label>Pseudonyme</label>
          <input 
          ref={(ref) => this.usernameInput = ref}
          type='text'
          name='username'
          maxLength='40'
          value={ this.state.usernameInputValue }
          onChange={ (e) => this._inputValueChange(e) }
          placeholder='Vous recherchez ?' />
        </fieldset>
        <fieldset>
          <label>Mot de passe</label>
          <input 
          ref={(ref) => this.passwordInput = ref}
          type='password'
          name='password'
          maxLength='40'
          value={ this.state.passwordInputValue }
          onChange={ (e) => this._inputValueChange(e) }
          placeholder='Vous recherchez ?' />
        </fieldset>
        </form>
      </div>
    );
  }
}

export default SignIn;
