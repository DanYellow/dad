import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';

import APIManager from '../../utils/APIManager';

import ClassfiedAdvertisements from './../../fixtures/classified_advertisements.json';

import Pagination from '../Pagination';
import ClassifiedAdvertisementsList from '../ClassifiedAdvertisementsList';
import FlashMessage from '../FlashMessage';
import Loader from '../Loader';
import NoResults from '../NoResults';


import './style.scss';

class ClassifiedAdvertisementsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      failAPIQuery: false,
      APIDatas: {},
      isLoading: false
    }
  }

  componentDidMount() {
    APIManager.getClassifiedAdvertisements(this.props.params.id, this.props.params.query, this.props.params.category, this._getAdvertisementsSuccess.bind(this), this._getAdvertisementsFail.bind(this));
    
    if (process.env.NODE_ENV) {
      this.setState({ APIDatas: ClassfiedAdvertisements });
    }
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.params.id;
    let currentId = this.props.params.id;

    let oldQuery = prevProps.params.query;
    let currentQuery = this.props.params.query;

    let oldCategory = prevProps.params.category;
    let currentCategory = this.props.params.category;
    
    if (currentId !== oldId || currentQuery !== oldQuery || oldCategory !== currentCategory) {
      this.setState({ isLoading: true });
      APIManager.getClassifiedAdvertisements(currentId, currentQuery, currentCategory, this._getAdvertisementsSuccess.bind(this), this._getAdvertisementsFail.bind(this));
    };
  }

  _getAdvertisementsSuccess(response) {
    this.setState({ failAPIQuery: false, APIDatas:response, isLoading: false });
    this._scrollToId('title');
  }

  _getAdvertisementsFail(error) {
    this.setState({ failAPIQuery: true, isLoading: false });
    this._scrollToId('error');
  }

  _scrollToId(id) {
    let DOMElement = document.getElementById(id);
    if (!DOMElement) { return; }
    DOMElement.scrollIntoView();
  }

  _renderResults() {
    if (this.state.APIDatas.data.list.length > 0) {
      return this._renderClassifiedAdvertisements();
    } else {
      return <NoResults />;
    }
  }

  _renderClassifiedAdvertisements() {
    let { pagination } = this.state.APIDatas;
    let { list } = this.state.APIDatas.data;

    return (
      <div>
        { (this.props.env === 'public' && !this.props.params.query) && <h2 id='title' className='bordered-title'>Les dernières annonces</h2> }
        { (this.props.env === 'public' && this.props.params.query) && <h2 id='title' className='bordered-title'>{ pagination.total_items } résultat(s)</h2> }


        { this.props.env === 'back' && <h2 id='title' className='bordered-title'>Mes annonces</h2> }

        <ClassifiedAdvertisementsList list={ list } />


        { (pagination.prev || pagination.next) && <Pagination pagination={ pagination } /> }
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        { this.state.failAPIQuery && <FlashMessage message='Une erreur est survenue' type='error' autodelete={true} /> }
        
        { Object.keys(this.state.APIDatas).length > 0 && this._renderResults() }
        { Object.keys(this.state.APIDatas).length === 0 || this.state.isLoading && <Loader /> }
      </div>
    );
  }
}

ClassifiedAdvertisementsContainer.propTypes = {
  env: PropTypes.oneOf(['public', 'back'])
};

export default withRouter(ClassifiedAdvertisementsContainer, { withRef: false });

