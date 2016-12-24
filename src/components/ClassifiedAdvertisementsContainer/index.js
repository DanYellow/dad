import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';

import APIManager from '../../utils/APIManager';

import Pagination from '../Pagination';
import { Button } from '../_Form/FormButton';
import ClassifiedAdvertisementsList from '../ClassifiedAdvertisementsList';
import FlashMessage from '../FlashMessage';
import Loader from '../Loader';
import NoResults from '../NoResults';

import Utils from '../../utils/Utils';


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
    this._manageUserDisconnect();

    let extraParams = {}
    if (this.props.env === 'back' || Boolean(Utils.isAdminEnv())) {
      extraParams = {mine: 1};
    }

    const paramsURL = { p: this.props.params.page, q: this.props.location.query.q, 
                        c: this.props.location.query.c, ...extraParams }
    this._getClassifiedAdvertisements(paramsURL);
  }

  componentDidUpdate(prevProps) {
    let oldId           = prevProps.params.page;
    let currentId       = this.props.params.page;
    
    let oldQuery        = prevProps.location.search;
    let currentQuery    = this.props.location.search;

    window.localStorage.setItem('session_expire', false);

    this._manageUserDisconnect();
    
    if (currentId !== oldId || currentQuery !== oldQuery) {
      this.setState({ isLoading: true });

      let extraParams = {}
      if (this.props.env === 'back' || Boolean(Utils.isAdminEnv())) {
        extraParams = {mine: 1};
      }

      const paramsURL = { p: currentId, q: this.props.location.query.q,
                          c: this.props.location.query.c, ...extraParams }
      this._getClassifiedAdvertisements(paramsURL);
    };
  }

  _manageUserDisconnect() {
    if (this.props.location.state) {
      if (this.props.location.state.logged_out === true) {
        Utils.clearUserDatas();
      }
    }
  }

  _getClassifiedAdvertisements(paramsURL) {
    if (this.props.env === 'public') {
      APIManager.getClassifiedAdvertisements(paramsURL, this._getAdvertisementsSuccess.bind(this), this._getAdvertisementsFail.bind(this));
    } else {
      if (Utils.isTokenValid()) {
        APIManager.getClassifiedAdvertisements(paramsURL, this._getAdvertisementsSuccess.bind(this), this._getAdvertisementsFail.bind(this), true);
      } else {
        this.setState({ isLoading: false });

        window.localStorage.setItem('session_expire', true);
        let { router } = this.props;
        router.push(`/classified_advertisements/1`);
      }
    }
  }

  _getAdvertisementsSuccess(response) {
    this.setState({ failAPIQuery: false, APIDatas:response, isLoading: false });
  }

  _getAdvertisementsFail(error) {
    this.setState({ failAPIQuery: true, isLoading: false });
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
      if (this.props.env === 'public') {
        return <NoResults {...{ query: this.props.location.query.q }} />;
      } else {
        return <NoResults message="Vous n'avez pas d'annonces"/>;
      }
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

        <ClassifiedAdvertisementsList list={ list } env={ this.props.env } />
        { (pagination.prev || pagination.next) && <Pagination pagination={ pagination } /> }
        <div className='buttons-container fieldset'>
          <Button design='validation' text='Publier une annonce' link='/classified_advertisement/create' />
        </div>
      </div>
    );
  }

  _renderFlashMessages () {
    let isSessionExpire = false;
    let elementDeleted = false;
    let userLoggedOut = false;

    if (this.props.location.state) {
      let { tokenIsInvalid, element_deleted, logged_out } = this.props.location.state
      if (logged_out) {
        userLoggedOut = true;
      }
      if (tokenIsInvalid) {
        isSessionExpire = true;
      }
      if (element_deleted) {
        elementDeleted = true;
      }
    }
    
    return (
      <div>
      { this.state.failAPIQuery && <FlashMessage message='Une erreur est survenue' type='error' autodelete={true} /> }
      { isSessionExpire && <FlashMessage message='Votre session a expiré' type='error' autodelete={true} /> }

      { elementDeleted && <FlashMessage message='Votre annonce a été supprimée' type='success' autodelete={true} /> }
      { userLoggedOut && <FlashMessage message='Vous avez été déconnecté(e)' type='success' autodelete={true} /> }
      </div>
    )
  }

  render() {
    return (
      <div className='App'>
        { this.props.children }
        { this._renderFlashMessages() }
        { (Object.keys(this.state.APIDatas).length > 0 && !this.state.isLoading) && this._renderResults() }
        { (Object.keys(this.state.APIDatas).length === 0 || this.state.isLoading) && <Loader /> }
      </div>
    );
  }
}

ClassifiedAdvertisementsContainer.propTypes = {
  env: PropTypes.oneOf(['public', 'back'])
};

export default withRouter(ClassifiedAdvertisementsContainer);
