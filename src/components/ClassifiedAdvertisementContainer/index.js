import React, { Component } from 'react';
import { withRouter } from 'react-router';

import APIManager from '../../utils/APIManager';

import ClassifiedAdvertisement from './ClassifiedAdvertisement';

import Loader from '../Loader';
import NoResults from '../NoResults';

import './style.scss';

// bjnrky

class ClassifiedAdvertisementContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      APIDatas: {},
      isLoading: true
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    APIManager.getClassifiedAdvertisement(this.props.params.id, this._getAdvertisementSuccess.bind(this), this._getAdvertisementFail.bind(this));
  }

  componentDidUpdate(prevProps) {
    if (this.props.isCAUpdated) {
      this.props.classifiedAdvertisementUpdated({});
      this._getAdvertisementSuccess(this.props.updatedCADatas)
    }

    let oldId = prevProps.params.id;
    let currentId = this.props.params.id;
    if (currentId !== oldId && !this.props.isCAUpdated) {
      this.setState({ isLoading: true });
      APIManager.getClassifiedAdvertisement(this.props.params.id, this._getAdvertisementSuccess.bind(this), this._getAdvertisementFail.bind(this));
    }
  }

  _getAdvertisementSuccess(response) {
    this.setState({ APIDatas:response, isLoading: false });
  }

  _getAdvertisementFail(response) {
    this.setState({ APIDatas:response, isLoading: false });
  }

  _renderResults() {
    if (Object.keys(this.state.APIDatas).length === 0 || !this.state.APIDatas.data.resource) {
      return <NoResults message={'Cette annonce n\'existe pas'} />;
    }

    return this._renderClassifiedAdvertisement();
  }

  _renderClassifiedAdvertisement() {
    return <ClassifiedAdvertisement {...{resource: this.state.APIDatas.data.resource, siblings: this.state.APIDatas.siblings || {} }} />
  }

  render() {
    return (
      <div className='App'>
        { !this.state.isLoading && this._renderResults() }
        { this.state.isLoading && <Loader /> }
        
        { (this.props.children && !this.state.isLoading) && React.cloneElement(this.props.children, { resource: this.state.APIDatas.data.resource }) }
      </div>
    );
  }
}

export default withRouter(ClassifiedAdvertisementContainer);
