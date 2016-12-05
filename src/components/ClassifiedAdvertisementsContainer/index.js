import React, { Component } from 'react';

// import APIManager from '../../utils/APIManager';

import ClassfiedAdvertisements from './../../fixtures/classified_advertisements.json';

import Pagination from '../Pagination'
import ClassifiedAdvertisementsList from '../ClassifiedAdvertisementsList'

export default class ClassifiedAdvertisementsContainer extends Component {

  render() {
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
