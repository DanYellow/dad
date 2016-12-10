import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import FormButton from '../../_Form/FormButton';
import InputLitteral from '../../_Form/InputLitteral';
import ValidationRules from '../../_Form/validation.js';

import './style.scss';

class SignUpForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='SignIn'>
        <h2 className='bordered-title'>Se connecter</h2>
        <form onSubmit={ handleSubmit } className='form' novalidate>
          <Field name='username' type='text' component={InputLitteral} label='Pseudonyme' />
          <Field name='email' type='text' component={InputLitteral} label='Adresse mail'/>
          <Field name='password' type='text' component={InputLitteral} label='Mot de passe'/>
          <Field name='password_confirmation' type='text' component={InputLitteral} label='Confirmer mot de passe'/>

          <div className='buttons-container fieldset'>
            <FormButton design='validation' text='Se connecter' type='submit' />
          </div>
        </form>
      </div>
    );
  }
}

SignUpForm = reduxForm({
  form: 'contact',
  validate: ValidationRules
})(SignUpForm);

export default SignUpForm;
