import React, { Component } from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';


import APIManager from '../../../utils/APIManager';
import Utils from '../../../utils/Utils';


import Loader from '../../Loader';

import FlashMessage from '../../FlashMessage';
import PopinInfos from '../../PopinInfos';

import ClassifiedAdvertisementForm from './ClassifiedAdvertisementForm';
import ClassifiedAdvertisementFormDelete from './ClassifiedAdvertisementFormDelete';


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
    if (this.props.router.params.id && /^\d+$/.test(Number(this.props.router.params.id))) {
      if (this.props.router.routes[3].path === 'edit') {
        const formData = Utils.createFormDataObject(values);
        APIManager.updateClassifiedAdvertisement(formData, this._updateSuccess.bind(this), this._apiFail.bind(this));
      } else {
        APIManager.deleteClassifiedAdvertisement(values.id, this._deleteSuccess.bind(this), this._apiFail.bind(this));
      }
    } else {
      const formData = Utils.createFormDataObject(values);
      APIManager.createClassifiedAdvertisement(formData, this._createSuccess.bind(this), this._apiFail.bind(this));
    }
  }

  _createSuccess(response) {
    this.setState({ isSuccess: true, isLoading: false, APIResponseCode: response.data.flash_message.api_code });
    this._redirectUser(`/classified_advertisement/${response.data.resource.id}`);
  }

  _updateSuccess(response) {
    this.setState({ isSuccess: true, isLoading: false, APIResponseCode: response.data.flash_message.api_code });
    this.props.classifiedAdvertisementUpdated(response);
    this._redirectUser(`/classified_advertisement/${this.props.params.id}`);
  }

  _deleteSuccess(response) {
    this.setState({ isSuccess: true, isLoading: false, APIResponseCode: response.data.flash_message.api_code });
    this._redirectUser('/classified_advertisements/1');
  }

  _apiFail(response) {
    this.setState({ hasErrors: true, isLoading: false, APIResponseCode: response.data.flash_message.api_code });
  }

  _handleClick = (e) => {
    this.setState({ hasErrors: false });
  }

  _redirectUser = (url) => {
    let { router } = this.props;

    setTimeout(() => {
      router.push(url);
    }, 1500);
  }

  _closePopin = () => {
    this.setState({ closePopin: true });

    const url = this.props.location.pathname.replace('/' + this.props.route.path, '')
    setTimeout(() => {
      this._redirectUser(url);
    }, 300);
  }

  _renderPopinContent() {
    return (
      <div className={ classNames('PopinOverlay',
                                  { 'small': (this.props.location.pathname.includes('delete') || !this.props.resource.is_mine) },
                                  { 'closed': this.state.closePopin }) }>
        <div className={ classNames('PopinForm',
                                  { 'closed': this.state.closePopin }) }>
          <div className='PopinFormWrapper'>
            { this.state.hasErrors && <FlashMessage message={ APIManager.getMessageForStatusCode(this.state.APIResponseCode) } type='error' onClick={ this._handleClick } /> }
            { this.state.isSuccess && <FlashMessage message={ APIManager.getMessageForStatusCode(this.state.APIResponseCode) } type='success' onClick={ this._handleClick } /> }

            { this.state.isLoading && <Loader /> }
            { (this.props.resource.is_mine && this.props.location.pathname.includes('edit')) && <ClassifiedAdvertisementForm onSubmit={ this._handleSubmit } initialValues={ {...this.props.resource, ...{has_updated_image: false}} } type='update' onClick={ this._closePopin } /> }
            { (this.props.resource.is_mine && this.props.location.pathname.includes('delete')) && <ClassifiedAdvertisementFormDelete onSubmit={ this._handleSubmit } initialValues={ this.props.resource } onClick={ this._closePopin } /> }
            
            { !this.props.resource.is_mine && <PopinInfos type='forbidden' message={"Vous n'avez pas accès à ce contenu. \nSi vous êtes le propriétaire de cette annonce, veuillez vous connecter."} onClick={ this._closePopin } /> }
          </div>
        </div>
      </div>
    );
  }

  _renderCreateForm() {
    return (
      <div className="App">
        { this.state.hasErrors && <FlashMessage message={ APIManager.getMessageForStatusCode(this.state.APIResponseCode) } type='error' onClick={ this._handleClick } /> }
        { this.state.isSuccess && <FlashMessage message={ APIManager.getMessageForStatusCode(this.state.APIResponseCode) } type='success' onClick={ this._handleClick } /> }

        { this.state.isLoading && <Loader /> }
        <ClassifiedAdvertisementForm onSubmit={ this._handleSubmit } initialValues={{}} onClick={ this._closePopin } type='create' />
      </div>
    )
  }

  render() {
    if (this.props.router.params.id && /^\d+$/.test(Number(this.props.router.params.id))) {
      return this._renderPopinContent();
    } else {
      return this._renderCreateForm();
    }
  }
}

export default withRouter(ClassifiedAdvertisementFormContainer);
