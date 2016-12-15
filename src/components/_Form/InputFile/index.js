import React from 'react';

import uuid from 'node-uuid';

import './style.scss';

import FormButton from '../FormButton'

// http://stackoverflow.com/questions/36654641/file-attachments-for-redux-form-and-elixir-phoenix-as-backend-api-serialization

const InputFile = function ({ input, fields, label, type, meta: { touched, error, warning, placeholder }, ...extras }) {
  const id = uuid.v1();
  let fileInput;
  let reader = new FileReader();

  let removeImage = () => {
    document.getElementById('uploadImage').setAttribute('src', '');
    fileInput.setAttribute('value', '');
  }

  let displayImageUploaded = ({ target }) => {

    if (target.files && target.files[0]) {
      
      reader.onload = function (e) {
        document.getElementById('uploadImage').setAttribute('src', e.target.result);
        // console.log();
        // const files = [ ...e.target.files ];
        // fileInput.setAttribute('value', e.target);
      }
      window.foo = fileInput.files[0];
      // fileInput.setAttribute('value', fileInput.files[0]);
      console.log('fileInput.files[0]', fileInput.files[0]);

      reader.readAsDataURL(target.files[0]);
    }
  }

  return (
    <div className='InputFile'>
      <label htmlFor={id}>
        <figure>
          <img id='uploadImage' src="https://placekitten.com/g/300/300" width="250" alt={ 'altImg' } />
        </figure>
      </label>
      <div className='buttons-container fieldset'>
        <FormButton design='cancel' text='Supprimer' type='button' onClick={ removeImage } />
      </div>
      <input
        id={id}
        ref={(ref) => fileInput = ref}
        {...input}
        onChange={ displayImageUploaded }
        type="file" />
    </div>
  );
};

export default InputFile;