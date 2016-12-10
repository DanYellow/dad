import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import FormButton from '../../../_Form/FormButton';
import InputLitteral from '../../../_Form/InputLitteral';
import TextArea from '../../../_Form/TextArea';
import ErrorMessages from '../../../_Form/validation.js';


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


  return errors;
}


class ClassifiedAdvertisementForm extends Component {
  render() {
    const { handleSubmit, initialValues } = this.props;
    return (
      <div className='PopinForm'>
        <h2 className='bordered-title'>Mettre à jour l'annonce</h2>
        <form onSubmit={ handleSubmit } className='form'>
          {  initialValues.id && <input type='hidden' value={ initialValues.id} name='id' /> }
          <section className='wrapper'>
            <figure>
              <img src="https://placekitten.com/g/300/300" width="250" alt={ 'altImg' } />
              <div className='buttons-container fieldset'>
                <FormButton design='cancel' text='Supprimer' type='button' />
              </div>
            </figure>
            <div className='content'>
              <Field name='title' type='text' component={InputLitteral} label='Titre' value={  initialValues.title } />
              <Field name='description' component={TextArea} label='Description' type='text' placeholder='' value={  initialValues.description } />
              <Field name='price' type='text' component={InputLitteral} label='Prix (entre 0 et 9999 euros)' placeholder='Prix' value={  initialValues.price } />

              <div className='buttons-container fieldset'>
                <FormButton design='validation' text='Mettre à jour' type='submit' />
              </div>
              </div>
          </section>
        </form>
      </div>
    );
  }
}

ClassifiedAdvertisementForm = reduxForm({
  form: 'update_classifiedadvertisement',
  validate
})(ClassifiedAdvertisementForm);

export default ClassifiedAdvertisementForm;
