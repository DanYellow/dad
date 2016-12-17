import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import FormButton from '../../../_Form/FormButton';
import InputLitteral from '../../../_Form/InputLitteral';
import TextArea from '../../../_Form/TextArea';
import Select from '../../../_Form/Select';
import InputFile from '../../../_Form/InputFile';

import ErrorMessages from '../../../_Form/validation.js';

import './style.scss';

const validate = values => {
  const errors = {}

  if (!values.title) {
    errors.title = ErrorMessages.required;
  }

  if (values.price > 9999) {
    errors.price = ErrorMessages.price;
  }

  return errors;
}


class ClassifiedAdvertisementForm extends Component {
  _renderUpdateHeader() {
    return (
      <legend className='legend'>
        <h2 className='bordered-title'>Mettre à jour l'annonce</h2>
        <button title='Fermer popin' className='reset icon-close' onClick={ this.props.onClick }></button>
      </legend>
    )
  }

  _renderCreateHeader() {
    return (
      <legend className='legend'>
        <h2 className='bordered-title'>Créer une annonce</h2>
      </legend>
    )
  }

  render() {
    const { handleSubmit, initialValues } = this.props;
    console.log('initialValues', initialValues)
    return (
      <div>
        { this.props.type === 'update' && this._renderUpdateHeader() }
        { this.props.type === 'create' && this._renderCreateHeader() }
        <form onSubmit={ handleSubmit } className='form' encType='multipart/form-data'>
          { initialValues.id && <input type='hidden' value={ initialValues.id } name='id' /> }
          <section className='wrapper'>
            { <Field name='image' type='text' component={InputFile} label='Titre' value={ initialValues.image } /> }
            <div className='content'>
              <Field name='title' type='text' component={InputLitteral} label='Titre' value={  initialValues.title || '' } />
              <Field name='description' component={TextArea} label='Description' type='text' placeholder='' value={ initialValues.description || '' } />
              <Field name='price' type='text' component={InputLitteral} label='Prix (entre 0 et 9 999 euros)' placeholder='Prix' value={ initialValues.price || '' } />
              
              <Field name='category' component={props =>
                <Select {...props} />
              } label='Catégorie' value={ {value: 9} }/>

              <div className='buttons-container fieldset'>
                { this.props.type === 'update' && <FormButton design='validation' text='Mettre à jour' type='submit' /> }
                { this.props.type === 'create' && <FormButton design='validation' text='Créer' type='submit' /> }
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

ClassifiedAdvertisementForm.propTypes = {
  type: PropTypes.oneOf(['create', 'update'])
};


export default ClassifiedAdvertisementForm;
