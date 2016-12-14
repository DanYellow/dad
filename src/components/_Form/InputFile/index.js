import React from 'react';

import uuid from 'node-uuid';

import './style.scss';

import FormButton from '../FormButton'


const InputFile = function ({ input, label, type, meta: { touched, error, warning, placeholder }, ...extras }) {
  const id = uuid.v1();
  let fileInput;
  let reader = new FileReader();

  let removeImage = () => {
    document.getElementById('uploadImage').setAttribute('src', '');
  }

  let displayImageUploaded = ({ target }) => {
    if (target.files && target.files[0]) {
      
      reader.onload = function (e) {
        document.getElementById('uploadImage').setAttribute('src', e.target.result);
      }
      reader.readAsDataURL(target.files[0]);
    }
  }

  // console.log(input)
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
        name={input.name}
        onChange={ displayImageUploaded }
        type="file" />
    </div>
  );
};

export default InputFile;