import React, {Component} from 'react';

import uuid from 'node-uuid';
import Dropzone from 'react-dropzone';

import './style.scss';

import FormButton from '../FormButton'


class InputFile extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      imagePreview: null
    }

    this.id = uuid.v1();
  }

  _openFM = () => {
    this.dropzone.open()
  }

  _removeImage = () => {
    document.getElementById('uploadImage').setAttribute('src', '');
    this.setState({ imagePreview: null });
    this.props.input.onChange(null);
  }

  _onDropAccepted = ( filesToUpload, e ) => {
    let image = filesToUpload[0];
    this.setState({imagePreview: image.preview})

    this.props.input.onChange(image)
  }

  _onDropRejected = () => {

  }

  render() {
    let { input, label, ...extras } = this.props;
    let imgAlt = null;
    
    return (
      <div className='InputFile'>
        <Dropzone
          name={input.name}
          maxSize={420000}
          disableClick={true}
          activeClassName='dropzone-overlay'
          className='dropzone'
          style={{width: 'auto'}}
          ref={(ref) => { this.dropzone = ref; }}
          onDropAccepted={ this._onDropAccepted }
          onDropRejected={ this._onDropRejected }
          >
          <figure onClick={ this._openFM }>
            <img id='uploadImage' src={this.state.imagePreview} width="250" alt={ imgAlt } />
            <div className="drop-placeholder">
              <p className="icon-download"></p>
              <p> Glissez votre image</p>
            </div>
          </figure>
        </Dropzone>
        <div className='buttons-container fieldset column-layout'>
          <FormButton design='validation' text='Ajouter une image' type='button' onClick={ this._openFM } />
          { this.state.imagePreview && <FormButton design='cancel' text='Supprimer' type='button' onClick={ this._removeImage } /> }
        </div>
      </div>
    );
  }
}


export default InputFile;
