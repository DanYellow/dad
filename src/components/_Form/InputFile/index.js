import React, {Component} from 'react';

import uuid from 'node-uuid';
// import Dropzone from 'react-dropzone'

import './style.scss';

import FormButton from '../FormButton'

// http://stackoverflow.com/questions/36654641/file-attachments-for-redux-form-and-elixir-phoenix-as-backend-api-serialization

class InputFile extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      hasImage: false
    }

    this.id = uuid.v1();
    this.fileInput;
    this.reader = new FileReader();
  }

  _displayImageUploaded = ({ target }) => {

    if (target.files && target.files[0]) {
      
      this.reader.onload = function (e) {
        document.getElementById('uploadImage').setAttribute('src', e.target.result);
      }
      
      window.foo = this.fileInput.files[0];

      this.reader.readAsDataURL(target.files[0]);
    }
  }

  _removeImage = () => {
    document.getElementById('uploadImage').setAttribute('src', '');
    this.fileInput.setAttribute('value', '');
  }


  render() {
    let { input, fields, label, type, meta: { touched, error, warning, placeholder }, ...extras } = this.props;

    return (
      <div className='InputFile'>
        <label htmlFor={this.id}>
          <figure>
            <img id='uploadImage' src={input.value} width="250" alt={ 'altImg' } />
          </figure>
        </label>
        <div className='buttons-container fieldset'>
          <FormButton design='cancel' text='Supprimer' type='button' onClick={ this._removeImage } />
        </div>

        {/*<Field name="file" component='input' type="hidden" />

        <Dropzone
            ref="dropzone"
            onDrop={(upload) => dispatch(change('FileUploadExampleForm', 'file', upload[0]))}
            multiple={false}
            accept='image/*'>
            <div>Click here select files to upload.</div>
        </Dropzone>*/}

        <input
          id={this.id}
          ref={(ref) => this.fileInput = ref}
          {...input}
          onChange={ this._displayImageUploaded }
          type="file" />
      </div>
    );
  }
}


// const InputFile = function () {
  


  

export default InputFile;