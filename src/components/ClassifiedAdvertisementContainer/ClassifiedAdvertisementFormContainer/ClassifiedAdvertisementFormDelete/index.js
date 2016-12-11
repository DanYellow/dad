import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import FormButton from '../../../_Form/FormButton';

import './style.scss';

class ClassifiedAdvertisementForm extends Component {
  render() {
    const { handleSubmit, initialValues, onClick } = this.props;
    return (
      <div>
        <legend className='legend center warning'>
          <h2 className='title'>Danger zone</h2>
          <p>Souhaitez-vous réellement supprimer cette annonce ?</p>
        </legend>

        <form onSubmit={ handleSubmit } className='form'>
          <input type='hidden' value={ initialValues.id } name='id' />
          <section>
            <div className='content'>
              <div className='buttons-container fieldset'>
                <FormButton design='validation' text='Oui' type='submit' />
                <FormButton design='cancel' text='Non' type='button' onClick={ onClick } />
              </div>
            </div>
          </section>
        </form>
      </div>
    );
  }
}

ClassifiedAdvertisementForm = reduxForm({
  form: 'delete_classifiedadvertisement',
})(ClassifiedAdvertisementForm);

export default ClassifiedAdvertisementForm;
