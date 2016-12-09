import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import Loader from '../../Loader';
import FormButton from '../../StandAlones/FormButton';

import APIManager from '../../../utils/APIManager';
import Utils from '../../../utils/Utils';

import './style.scss';

class ContactForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='SignIn'>
        <h2 id='title' className='bordered-title'>Se connecter</h2>
        <form onSubmit={ handleSubmit } className='form sign' id='form'>
        <div className='fieldset'>
          <label>Pseudonyme / Adresse mail</label>
          <Field name="username" component="input" type="text"/>
        </div>
        <div className='fieldset'>
          <label>Mot de passe</label>
          <Field name="password" component="input" type="password"/>
        </div>
        <div className='buttons-container fieldset'>
          <FormButton design='validation' text='Se connecter' type='submit' />
        </div>
        </form>
      </div>
    );
  }
}

// Decorate the form component
ContactForm = reduxForm({
  form: 'contact' // a unique name for this form
})(ContactForm);

export default ContactForm;
