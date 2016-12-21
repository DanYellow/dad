import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Helmet from 'react-helmet';

import FormButton from '../../_Form/FormButton';
import InputLitteral from '../../_Form/InputLitteral';
import ErrorMessages from '../../_Form/validation.js';

import './style.scss';

const validate = values => {
  const errors = {}

  if (!values.username) {
    errors.username = ErrorMessages.required;
  }

  if (!values.password) {
    errors.password = ErrorMessages.required;
  }

  if (!values.password_confirmation && values.password) {
    errors.password_confirmation = ErrorMessages.password_confirmation;
  }

  if (values.password !== values.password_confirmation && values.password) {
    errors.password = ErrorMessages.password_confirmation;
  }

  if (!values.email) {
    errors.email = ErrorMessages.required;
  }

  return errors;
}


class SignUpForm extends Component {
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className='SignIn'>
        <Helmet title={ 'Inscription' } />
        <h2 className='bordered-title'>S'inscrire</h2>
        <form onSubmit={ handleSubmit } className='form' noValidate>
          <Field name='username' type='text' component={ InputLitteral } label='Pseudonyme' />
          <Field name='email' type='text' component={ InputLitteral } label='Adresse mail'/>
          <Field name='password' type='password' component={ InputLitteral } label='Mot de passe'/>
          <Field name='password_confirmation' type='password' component={ InputLitteral } label='Confirmer mot de passe'/>

          <div className='buttons-container fieldset'>
            <FormButton design='validation' text={ "S'inscrire" } type='submit' disabled={ submitting } />
          </div>
        </form>
      </div>
    );
  }
}

SignUpForm = reduxForm({
  form: 'contact',
  validate
})(SignUpForm);

export default SignUpForm;
