import React, { Component } from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';


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
      closePopin: false
    }
  }

  _handleSubmit = (values) => {
    this.setState({ isLoading: true, hasErrors: false });
    APIManager.updateClassifiedAdvertisement(values, this._updateSuccess.bind(this), this._updateFail.bind(this));
  }

  _updateSuccess(response) {
    this.setState({ isSuccess: true, isLoading: false, APIResponseCode: response.data.flash_message.api_code });
    this._redirectUser(`/classified_advertisement/${this.props.params.id}`);
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

  _closePopin = () => {
    this.setState({ closePopin: true });

    setTimeout(() => {
      this._redirectUser(`/classified_advertisement/${this.props.params.id}`);
    }, 700);
  }

  render() {
    return (
      <div className={ classNames('PopinOverlay',
                                  { 'closed': this.state.closePopin }) }>
        <div className={ classNames('PopinForm',
                                  { 'closed': this.state.closePopin }) }>
          { this.state.hasErrors && <FlashMessage message={ APIManager.getMessageForStatusCode(this.state.APIResponseCode) } type='error' onClick={ this._handleClick } /> }
          { this.state.isSuccess && <FlashMessage message={ APIManager.getMessageForStatusCode(this.state.APIResponseCode) } type='success' onClick={ this._handleClick } /> }

          { this.state.isLoading && <Loader /> }
          { this.props.resource.is_mine && <ClassifiedAdvertisementForm onSubmit={ this._handleSubmit } initialValues={ this.props.resource } onClick={ this._closePopin } /> }
          
        </div>
      </div>
    );
  }
}

export default withRouter(ClassifiedAdvertisementFormContainer);
