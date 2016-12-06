import React, { Component, PropTypes } from 'react';

import APIManager from '../../utils/APIManager';

import ClassfiedAdvertisements from './../../fixtures/classified_advertisements.json';

import Pagination from '../Pagination'
import ClassifiedAdvertisementsList from '../ClassifiedAdvertisementsList'
import FlashMessage from '../FlashMessage'

export default class ClassifiedAdvertisementsContainer extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      failAPIQuery: false
    }
  }

  componentDidMount() {
    // let isUserConnected = this.props.env == 'front' ?
    // if (this.props.env == 'front') {
      
    // } else {
    //   APIManager.getClassifiedAdvertisements(undefined, undefined, this.hello, this.hello2)
    // }
    APIManager.getClassifiedAdvertisements(undefined, undefined, undefined, this._getAdvertisementsSuccess.bind(this), this._getAdvertisementsFail.bind(this));
  }

  _getAdvertisementsSuccess(response) {
    this.setState({failAPIQuery: false});
    console.log(response);
  }

  _getAdvertisementsFail(response) {
    this.setState({failAPIQuery: true});
    // alert("fail !")
  }

  render() {
    // if (process.env.NODE_ENV === 'development') {
    //   alert('regger');
    // }
    let { pagination } = ClassfiedAdvertisements;
    let list = ClassfiedAdvertisements.data.list;
    
    return (
      <div>
        { this.state.failAPIQuery && <FlashMessage message="Une erreur est survenue" type="error" autodelete={true} /> }
        <ClassifiedAdvertisementsList list={ list } />
        <Pagination pagination={ pagination }/>
      </div>
    );
  }
}

ClassifiedAdvertisementsContainer.propTypes = {
  env: React.PropTypes.oneOf(['front', 'back'])
};
