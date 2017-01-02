import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Helmet from 'react-helmet'

import FormButton from '../../../_Form/FormButton';
import InputLitteral from '../../../_Form/InputLitteral';
import TextArea from '../../../_Form/TextArea';
// import Select from '../../../_Form/Select';
import InputFile from '../../../_Form/InputFile';

import APIManager from '../../../../utils/APIManager';

import ErrorMessages from '../../../_Form/validation.js';

import './style.scss';

const validate = values => {
  const errors = {}

  if (!values.title) {
    errors.title = ErrorMessages.required;
  }

  if (values.price) {
    if (values.price > 9999) {
      errors.price = ErrorMessages.price;
    }
    if (isNaN(values.price)) {
      errors.price = ErrorMessages.not_price;
    }
  }

  return errors;
}

class HiddenField extends Component {
  render() {
    return (
      <input type='hidden' />
    );
  }
}


class ClassifiedAdvertisementForm extends Component {
  constructor(props) {
    super(props);
    this._loadCategories()

    this.state = {
      categories: []
    }
  }
  _renderUpdateHeader() {
    return (
      <legend className='legend'>
        <h2 className='bordered-title'>
          Mettre à jour l'annonce
          <p>* Champ obligatoire</p>
        </h2>
        <button title='Fermer popin' className='reset icon-close' onClick={ this.props.onClick }></button>
      </legend>
    )
  }

  _renderCreateHeader() {
    return (
      <legend className='legend'>
        <h2 className='bordered-title'>
          Créer une annonce
          <p>* Champ obligatoire</p>
        </h2>
        
      </legend>
    )
  }

  _loadCategories() {
    APIManager.getCategories().then((data) => {
      this.setState({categories: data})
    });
  }

  _onImageUpdated() {
    this.refs.has_updated_image.getRenderedComponent().props.input.onChange(true)
  }

  render() {
    const { handleSubmit, initialValues, submitting } = this.props;
    
    return (
      <div>
        { this.props.type === 'update' && this._renderUpdateHeader() }
        { this.props.type === 'create' && this._renderCreateHeader() }

        { this.props.type === 'update' && <Helmet title={ "Mettre à jour l'annonce" } /> }
        { this.props.type === 'create' && <Helmet title={ "Créer une annonce" } /> }

        <form onSubmit={ handleSubmit } className='form' encType='multipart/form-data'>
          { initialValues.id && <input type='hidden' value={ initialValues.id } name='id' /> }

          <Field name='has_updated_image' withRef={true} ref='has_updated_image' component={HiddenField}/>
          
          <section className='wrapper'>
            { <Field name='image' component={InputFile} label='' value={ initialValues.image } onImageUpdated={ () => this._onImageUpdated() } /> }
            <div className='content'>
              <Field name='title' type='text' component={InputLitteral} label='Titre *' placeholder="Titre de l'annonce" value={  initialValues.title || '' } />
              <Field name='description' component={TextArea} label='Description' type='text' placeholder='' value={ initialValues.description || '' } />
              <Field name='price' type='text' component={InputLitteral} label="Prix (Ne pas préciser la devise - Laisser vide si c'est gratuit)" placeholder='Prix' value={ initialValues.price || '' } />
              {/*<Field name='category' component={props =>
                <Select {...props} {...this.state.categories} />
              } label='Catégorie'/>*/}

              <div className='buttons-container fieldset'>
                { this.props.type === 'update' && <FormButton design='validation' text='Mettre à jour' type='submit' disabled={ submitting } /> }
                { this.props.type === 'update' && <FormButton design='cancel' text='Annuler' type='button' onClick={ this.props.onClick } /> }
                { this.props.type === 'create' && <FormButton design='validation' text='Créer' type='submit' disabled={ submitting } /> }
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
