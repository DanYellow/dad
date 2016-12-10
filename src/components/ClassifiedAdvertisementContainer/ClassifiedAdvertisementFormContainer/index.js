import React, { Component } from 'react';
import { withRouter } from 'react-router';

import APIManager from '../../../utils/APIManager';


import Loader from '../../Loader';

import FlashMessage from '../../FlashMessage';

import ClassifiedAdvertisementForm from './ClassifiedAdvertisementForm';



// import './style.scss';

class ClassifiedAdvertisementFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSuccess: false,
      hasErrors: false,
      isLoading: false,
      APIResponseCode: 0,
      flashMessage: {}
    }
  }

  _handleSubmit = (values) => {
    this.setState({ isLoading: true, hasErrors: false });
    // APIManager.updateClassifiedAdvertisement(values, this._signInSuccess.bind(this), this._apiCallFail.bind(this));
  }

  _updateSuccess(response) {
    this.setState({ isSuccess: true, isLoading: false, APIResponseCode: response.data.flash_message.api_code });
    this._redirectUser('/classified_advertisements');

    this.setState({
      flashMessage: {
        message: APIManager.getMessageForStatusCode(this.state.APIResponseCode),
        type: 'success'
      }
    });
  }

  _updateFail(response) {
    this.setState({ hasErrors: true, isLoading: false, APIResponseCode: response.data.flash_message.api_code });
    this.setState({
      flashMessage: {
        message: APIManager.getMessageForStatusCode(this.state.APIResponseCode),
        type: 'error'
      }
    })
  }

  _handleClick = (e) => {
    this.setState({ hasErrors: false });
  }

  _redirectUser = (url) => {
    let { router } = this.props;

    setTimeout(() => {
      router.push(url);
    }, 2500);
  }

  render() {
    console.log(this.props.resource)
    return (
      <div className='PopinOverlay'>
        <div className='PopinForm'>
          { this.state.hasErrors && <FlashMessage message={ APIManager.getMessageForStatusCode(this.state.APIResponseCode) } type='error' onClick={ this._handleClick } /> }
          { this.state.isSuccess && <FlashMessage message={ APIManager.getMessageForStatusCode(this.state.APIResponseCode) } type='success' onClick={ this._handleClick } /> }

          { this.state.isLoading && <Loader /> }
          { this.props.resource.is_mine && <ClassifiedAdvertisementForm onSubmit={ this._handleSubmit } initialValues={ this.props.resource } {...{hello: 'foo'}} /> }
          { !this.props.resource.is_mine && <ClassifiedAdvertisementForm onSubmit={ this._handleSubmit } initialValues={ this.props.resource } flashMessage={ this.state.flashMessage } /> }
        </div>
      </div>
    );
  }
}

export default withRouter(ClassifiedAdvertisementFormContainer);
