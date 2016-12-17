import React, {Component} from 'react';

import uuid from 'node-uuid';
import Dropzone from 'react-dropzone';

import './style.scss';

import FormButton from '../FormButton'


class InputFile extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      imagePreview: this.props.input.value
    }

    this.id = uuid.v1();
    this.imagerequirements = 'Taille maximale autorisée : 4,2 Mo | Formats acceptés : .jp(e)g, .png, .gif';
  }

  componentDidMount() {
    var image = new File([this.props.input.value], null, null);
    this.props.input.onChange(image);
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
    let { input } = this.props;
    let imgAlt = null;
    
    return (
      <div className='InputFile'>
        <Dropzone
          name={input.name}
          maxSize={4200000}
          disableClick={true}
          activeClassName='dropzone-overlay'
          className='dropzone'
          style={{width: 'auto'}}
          ref={(ref) => { this.dropzone = ref; }}
          onDropAccepted={ this._onDropAccepted }
          onDropRejected={ this._onDropRejected }
          >
          <div className="drop-placeholder">
            <p className="icon-download"></p>
            <h2>Glissez votre image</h2>
            <p>{ this.imagerequirements }</p>
          </div>
        </Dropzone>
          <figure onClick={ this._openFM }>
            <img id='uploadImage' src={this.state.imagePreview} width="250" alt={ imgAlt } />
            { !this.state.imagePreview && <div className="drop-placeholder">
              <p className="icon-download"></p>
              <h2>Glissez votre image</h2>
              <p>{ this.imagerequirements }</p>
            </div> }
          </figure>
        <div className='buttons-container fieldset column-layout'>
          <FormButton design='validation' text='Ajouter une image' type='button' onClick={ this._openFM } />
          { this.state.imagePreview && <FormButton design='cancel' text='Supprimer' type='button' onClick={ this._removeImage } /> }
        </div>
        
      </div>
    );
  }
}


export default InputFile;
