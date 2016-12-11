import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import FormButton from '../../../_Form/FormButton';
import InputLitteral from '../../../_Form/InputLitteral';
import TextArea from '../../../_Form/TextArea';
import Select from '../../../_Form/Select';

import ErrorMessages from '../../../_Form/validation.js';

import './style.scss';

const validate = values => {
  const errors = {}

  if (!values.title) {
    errors.title = ErrorMessages.required;
  }

  var numberRegex = /^\d{1,4}$/g;
  if (!numberRegex.test(Number(values.price))) {
    errors.price = ErrorMessages.price;
  }

  return errors;
}


class ClassifiedAdvertisementForm extends Component {
  render() {
    const { handleSubmit, initialValues, onClick } = this.props;

    return (
      <div>
        <legend className='legend'>
          <h2 className='bordered-title'>Mettre à jour l'annonce</h2>
          <button title='Fermer popin' className='reset icon-close' onClick={ onClick }></button>
        </legend>

        <form onSubmit={ handleSubmit } className='form'>
          {  initialValues.id && <input type='hidden' value={ initialValues.id } name='id' /> }
          <section className='wrapper'>
            <figure>
              <img src="https://placekitten.com/g/300/300" width="250" alt={ 'altImg' } />
              <div className='buttons-container fieldset'>
                <FormButton design='cancel' text='Supprimer' type='button' />
              </div>
            </figure>
            <div className='content'>
              <Field name='title' type='text' component={InputLitteral} label='Titre' value={  initialValues.title } />
              <Field name='description' component={TextArea} label='Description' type='text' placeholder='' value={ initialValues.description } />
              <Field name='price' type='text' component={InputLitteral} label='Prix (entre 0 et 9 999 euros)' placeholder='Prix' value={ initialValues.price } />
              
              <Field name='category' component={props =>
                <Select {...props} />
              } label='Catégorie' value={ initialValues.category }/>

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
