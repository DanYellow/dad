import React, { Component, PropTypes } from 'react';

import APIManager from '../../utils/APIManager';

import ClassfiedAdvertisements from './../../fixtures/classified_advertisements.json';

import Pagination from '../Pagination'
import ClassifiedAdvertisementsList from '../ClassifiedAdvertisementsList'

export default class ClassifiedAdvertisementsContainer extends Component {

  componentDidMount() {
    // let isUserConnected = this.props.env == 'front' ?
    // if (this.props.env == 'front') {
      
    // } else {
    //   APIManager.getClassifiedAdvertisements(undefined, undefined, this.hello, this.hello2)
    // }
    APIManager.getClassifiedAdvertisements(undefined, undefined, this._getAdvertisementsSuccess, this._getAdvertisementsFail);
  }

  _getAdvertisementsSuccess(response) {
    console.log(response);
  }

  _getAdvertisementsFail(response) {

  }

  render() {
    // if (process.env.NODE_ENV === 'development') {
    //   alert('regger');
    // }
    let { pagination } = ClassfiedAdvertisements;
    let list = ClassfiedAdvertisements.data.list;
    
    return (
      <div>
        <ClassifiedAdvertisementsList list={ list } />
        <Pagination pagination={ pagination }/>
      </div>
    );
  }
}

ClassifiedAdvertisementsContainer.propTypes = {
  env: React.PropTypes.oneOf(['front', 'back'])
};
