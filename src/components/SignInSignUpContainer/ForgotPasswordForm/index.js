import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Helmet from 'react-helmet';

import FormButton from '../../_Form/FormButton';
import InputLitteral from '../../_Form/InputLitteral';
import ErrorMessages from '../../_Form/validation.js';

import './style.scss';

const mailRegex = /^[\w.-]+@[\w.-]{2,}\.[a-z]{2,}$/;

const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = ErrorMessages.required;
  } else if (!mailRegex.test(values.email)) {

  }

  return errors;
}


class ForgotPasswordForm extends Component {
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className='SignIn'>
        <Helmet title={ 'Mot de passe oublié' } />
        <h2 className='bordered-title'>Mot de passe oublié</h2>
        <form onSubmit={ handleSubmit } className='form' noValidate>
          <Field name='email' type='text'
                 placeholder='Pseudonyme ou adresse mail de votre compte'
                component={ InputLitteral } label='Pseudonyme ou adresse mail' />
          
          <div className='buttons-container fieldset'>
            <FormButton design='validation' text={ "Envoyer le mail de récupération" } type='submit' disabled={ submitting } />
          </div>
        </form>
      </div>
    );
  }
}

ForgotPasswordForm = reduxForm({
  form: 'contact',
  validate
})(ForgotPasswordForm);

export default ForgotPasswordForm;
