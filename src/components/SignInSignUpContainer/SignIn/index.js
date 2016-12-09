import React, { Component } from 'react';
import { withRouter } from 'react-router';

import APIManager from '../../../utils/APIManager';
import Utils from '../../../utils/Utils';

import Loader from '../../Loader';
import FormButton from '../../StandAlones/FormButton';

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

    var myForm = document.getElementById('form');
    
    
    console.log(Utils.getFormDataObj(myForm));
  }

  _inputValueChange(e) {
    const stateKey = e.target.getAttribute('name') + 'InputValue';
    this.setState({ [stateKey]: e.target.value });
  }

  render() {
    return (
      <div className='SignIn'>
        <h2 id='title' className='bordered-title'>Se connecter</h2>
        <form onSubmit={ (e) => this._onSubmit(e) } className='form sign' id='form'>
        <div className='fieldset'>
          <label>Pseudonyme / Adresse mail</label>
          <input 
          ref={(ref) => this.usernameInput = ref}
          type='text'
          name='username'
          maxLength='40'
          value={ this.state.usernameInputValue }
          onChange={ (e) => this._inputValueChange(e) }
          placeholder='Pseudonyme / Adresse mail' />
        </div>
        <div className='fieldset'>
          <label>Mot de passe</label>
          <input 
          ref={(ref) => this.passwordInput = ref}
          type='password'
          name='password'
          maxLength='40'
          value={ this.state.passwordInputValue }
          onChange={ (e) => this._inputValueChange(e) }
          placeholder='Mot de passe' />
        </div>
        <div className='buttons-container fieldset'>
          <FormButton design='validation' text='Se connecter' type='submit' />
        </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
