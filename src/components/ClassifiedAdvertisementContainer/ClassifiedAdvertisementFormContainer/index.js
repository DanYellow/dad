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
      APIResponseCode: 0
    }
  }

  _handleSubmit = (values) => {
    this.setState({ isLoading: true, hasErrors: false });
    APIManager.updateClassifiedAdvertisement(values, this._signInSuccess.bind(this), this._apiCallFail.bind(this));
  }

  _updateSuccess(response) {
    this.setState({ isSuccess: true, isLoading: false, APIResponseCode: response.data.flash_message.api_code });
    this._redirectUser('/classified_advertisements');

  }

  _updateFail(response) {
    this.setState({ hasErrors: true, isLoading: false, APIResponseCode: response.data.flash_message.api_code });
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
    return (
      <div className='PopinContainer'>
        { this.state.hasErrors && <FlashMessage message={ APIManager.getMessageForStatusCode(this.state.APIResponseCode) } type='error' onClick={ this._handleClick } /> }
        { this.state.isSuccess && <FlashMessage message={ APIManager.getMessageForStatusCode(this.state.APIResponseCode) } type='success' onClick={ this._handleClick } /> }

        { this.state.isLoading && <Loader /> }
        <ClassifiedAdvertisementForm onSubmit={ this._handleSubmit } initialValues={ this.props.resource }/>
      </div>
    );
  }
}

export default withRouter(ClassifiedAdvertisementFormContainer);
