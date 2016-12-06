import React, { Component, PropTypes } from 'react';

import APIManager from '../../utils/APIManager';

import ClassfiedAdvertisements from './../../fixtures/classified_advertisements.json';

import Pagination from '../Pagination';
import ClassifiedAdvertisementsList from '../ClassifiedAdvertisementsList';
import FlashMessage from '../FlashMessage';
import Loader from '../Loader';

import './style.scss';

export default class ClassifiedAdvertisementsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      failAPIQuery: false,
      APIDatas: {}
    }
  }

  componentDidMount() {
    console.log("componentDidMount")

    APIManager.getClassifiedAdvertisements(undefined, undefined, undefined, this._getAdvertisementsSuccess.bind(this), this._getAdvertisementsFail.bind(this));
    this.setState({ APIDatas: ClassfiedAdvertisements });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }


  _getAdvertisementsSuccess(response) {
    this.setState({failAPIQuery: false});

    document.getElementById('title').scrollIntoView();
  }

  _getAdvertisementsFail(response) {
    this.setState({failAPIQuery: true});

    document.getElementById('error').scrollIntoView();
  }

  _renderResults() {
    let { pagination } = this.state.APIDatas;
    let { list } = this.state.APIDatas.data;

    return (
      <div>
        <ClassifiedAdvertisementsList list={ list } />
        <Pagination pagination={ pagination } />
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.state.failAPIQuery && <FlashMessage message="Une erreur est survenue" type="error" autodelete={true} /> }

        { this.props.env === 'front' && <h2 id="title" className='bordered-title'>Les dernières annonces</h2> }
        { this.props.env === 'back' && <h2 id="title" className='bordered-title'>Mes annonces</h2> }
        
        { Object.keys(this.state.APIDatas).length > 0 && this._renderResults() }
        { Object.keys(this.state.APIDatas).length === 0 && <Loader /> }
      </div>
    );
  }
}

ClassifiedAdvertisementsContainer.propTypes = {
  env: React.PropTypes.oneOf(['front', 'back'])
};
