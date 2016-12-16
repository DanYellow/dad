import React, {Component} from 'react';

import uuid from 'node-uuid';
import Dropzone from 'react-dropzone';

import './style.scss';

import FormButton from '../FormButton'


class InputFile extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      hasImage: false,
      imagePreview: null
    }

    this.id = uuid.v1();
    this.fileInput;
    this.reader = new FileReader();
  }

  _openFM = () => {
    this.dropzone.open()
  }

  _removeImage = () => {
    document.getElementById('uploadImage').setAttribute('src', '');
    this.fileInput.setAttribute('value', '');
    this.setState({ hasImage: false });
  }

  _onDropAccepted = ( filesToUpload, e ) => {
    let image = filesToUpload[0];
    this.setState({imagePreview: image.preview})
    console.log("gnrgrhtgrbtr")
    this.props.input.onChange(filesToUpload)
  }

  _onDropRejected = () => {

  }

  render() {
    let { input, label, ...extras } = this.props;

    return (
      <div className='InputFile'>
        <figure>
          <img id='uploadImage' src={this.state.imagePreview} width="250" alt={ 'altImg' } />
        </figure>
        <div className='buttons-container fieldset'>
          { !this.state.hasImage && <FormButton design='validation' text='Ajouter une image' type='button' onClick={ this._openFM } /> }
          { this.state.hasImage && <FormButton design='cancel' text='Supprimer' type='button' onClick={ this._removeImage } /> }
        </div>

        <Dropzone
          name='image'
          maxSize={42000}
          disableClick={true}
          activeClassName='dropzone-overlay'
          className='dropzone'
          style={{width: 'auto'}}
          ref={(ref) => { this.dropzone = ref; }}
          onDropAccepted={ this._onDropAccepted }
          onDropRejected={ this._onDropRejected }
          >
        </Dropzone>
      </div>
    );
  }
}


export default InputFile;
