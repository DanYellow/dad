import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import FormButton from '../../_Form/FormButton';
import InputLitteral from '../../_Form/InputLitteral';
import ValidationRules from '../../_Form/validation.js';

import './style.scss';

class SignInForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='SignIn'>
        <h2 className='bordered-title'>Se connecter</h2>
        <form onSubmit={ handleSubmit } className='form'>
          <Field name='username' type='text' component={InputLitteral} label='Pseudonyme / Adresse mail' maxLength="2" />
          <Field name='password' type='password' component={InputLitteral} label='Mot de passe'/>

          <div className='buttons-container fieldset'>
            <FormButton design='validation' text='Se connecter' type='submit' />
          </div>
        </form>
      </div>
    );
  }
}

SignInForm = reduxForm({
  form: 'contact',
  validate: ValidationRules
})(SignInForm);

export default SignInForm;