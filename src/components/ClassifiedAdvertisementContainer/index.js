import React, { Component } from 'react';
import { withRouter } from 'react-router';

import APIManager from '../../utils/APIManager';

import ClassifiedAdvertisement from './ClassifiedAdvertisement';

import Loader from '../Loader';
import NoResults from '../NoResults';

import './style.scss';

class ClassifiedAdvertisementContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      APIDatas: {},
      isLoading: true
    }
  }

  componentDidMount() {
    APIManager.getClassifiedAdvertisement(this.props.params.id, this._getAdvertisementSuccess.bind(this), this._getAdvertisementFail.bind(this));
  }

  _getAdvertisementSuccess(response) {
    this.setState({ APIDatas:response, isLoading: false });
  }

  _getAdvertisementFail(error) {
    this.setState({ isLoading: false });
  }

  _renderResults() {
    if (this.state.APIDatas.data.resource) {
      return this._renderClassifiedAdvertisement();
    } else {
      return <NoResults message={'Cette annonce n\'existe pas'} />;
    }
  }

  _renderClassifiedAdvertisement() {
    return <ClassifiedAdvertisement {...this.state.APIDatas.data.resource } />
  }

  render() {
    return (
      <div className="App">
        { !this.state.isLoading && this._renderResults() }
        { this.state.isLoading && <Loader /> }
        
        { (this.props.children && !this.state.isLoading) && React.cloneElement(this.props.children, { resource: this.state.APIDatas.data.resource }) }
      </div>
    );
  }
}

export default withRouter(ClassifiedAdvertisementContainer);
