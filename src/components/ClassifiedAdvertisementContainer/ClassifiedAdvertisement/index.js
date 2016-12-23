import React, { Component } from 'react';
import { withRouter, Link } from 'react-router';
import Helmet from 'react-helmet';

import moment from 'moment';

import Utils from '../../../utils/Utils';
import APIManager from '../../../utils/APIManager';

import Category from '../../StandAlones/Category';
import PlaceholderImage from '../../StandAlones/PlaceholderImage';

import './style.scss';

class ClassifiedAdvertisement extends Component {

  _renderFooter() {
    return (
      <footer className='toolbar'>
        <ul>
          <li>
            <Link to={ this.props.location.pathname + '/edit' }>Éditer votre annonce</Link>
          </li>
          <li>
            <Link to={ this.props.location.pathname + '/delete' }>Supprimer votre annonce</Link>
          </li>
        </ul>
      </footer>
    )
  }

  _getSiblingURL(id, env) {
    let url = '/classified_advertisement/' + id;
    if (env === 'back') {
      url = 'admin/classified_advertisement/' + id;
    }

    return url;
  }

  _updateStatus() {
    APIManager.updateStatusClassifiedAdvertisement(this.props.resource.id, this._updateSuccess, this._updateFailed)
  }

  _updateSuccess () {
    console.log('gregerge')
    this.props.router.push('/users/12')
    // this.props.router.push({
    //   pathname: 'admin/classified_advertisement/' + this.props.resource.id,
    //   state: { updateStatus: true }
    // })
  }

  _updateFailed() {

  }

  render() {
    // console.log(this.props);
    const { resource, siblings } = this.props;
    const { title, price, created_at, category, description, is_mine, image, seller, id, is_active } = resource;
    const productInfos = { seller: seller, price }
    const toolbarDatas = { id, is_active, location: this.props.location, _updateStatus: () => this._updateStatus() }
    
    const createdAt    = moment(created_at, 'YYYY-MM-DD HH:mm:s').format('DD/MM/YYYY à HH[h]mm');
    const altImg       = title + ' image';
    
    const env          = Utils.getCurrentEnvironment(this.props.location.pathname);

    return (
      <div className="ClassifiedAdvertisement">
        <Helmet title={ 'Annonce ' + title + ' par ' + seller.pseudo } />
        <header>
          <h2>{ title }</h2>
          { category && <Category {...category} /> }
          <p className='date'>{ 'Posté le ' + createdAt }</p>
        </header>
        <section className='wrapper'>
          <figure>
            { image && <img src={ image } alt={ altImg } /> }
            { !image && <PlaceholderImage /> }
          </figure>
          <article className='content'>
            <header>
              <h3>Description</h3>
              <p>{ description && description }</p>
              <p>{ !description && 'Pas de description' }</p>
            </header>
            { env !== 'back' && <ProductInfos {...productInfos}/> }
            { (env === 'back' && is_mine) && <Toolbar {...toolbarDatas}/> }
          </article>
        </section>
        <section className="siblings">
          <ul>
            <li>{ siblings.prev && 
              <Link to={ this._getSiblingURL(siblings.prev, env) }><span className='icon-leftarrow'></span>Annonce précédente</Link>}</li>
            <li>{ siblings.next && 
              <Link to={ this._getSiblingURL(siblings.next, env) }>Annonce suivante<span className='icon-rightarrow'></span></Link>
            }</li>
          </ul>
        </section>
        { (is_mine && env !== 'back') && this._renderFooter() }

        { this.props.children }
      </div>
    );
  }
}


class Toolbar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isActive: this.props.is_active,
      isDisabled: false
    }
  } 

  _updateStatus() {
    this.props._updateStatus()
    this.setState({ isActive: !this.state.isActive, isDisabled: true });
  }

  render() {
    let { location } = this.props;
    let saleText = (this.state.isActive) ? 'Déclarer comme vendu' : '(Re)mettre en vente';

    return (
      <div className='Insert Toolbar'>
       <div className='wrapper'>
        <ul>
          <li>
            <button disabled={this.state.isDisabled} className='reset' onClick={ () => this._updateStatus() }>
            <h5>{ saleText }</h5>
            <span className='icon-sold icon' />
            </button>
          </li>
          <li>
            <Link to={ location.pathname + '/edit' }>
              <h5>Editer</h5>
              <span className='icon-edit icon' />
            </Link>
          </li>
          <li>
            <Link to={ location.pathname + '/delete' }>
              <h5>Supprimer</h5>
              <span className='icon-trashcan icon' />
            </Link>
          </li>
         </ul>
        </div>
      </div>
    )
  }
}

const ProductInfos = function (props) {
  let price = props.price;
  if (price === 0) {
    price = 'Gratuit';
  } else {
    price = Utils.formatCurrency(price);
  }
  let { seller } = props;

  return (
   <div className='Insert'>
    <div className='wrapper'>
     <ul>
       <li>
         <h5>Prix</h5>
         <p className='price'>{ price }</p>
       </li>
       <li>
         <h5>Vendeur</h5>
         <section className='seller'>
          <h3 title='Entrez ce pseudonyme dans Outlook si vous souhaitez contacter le vendeur'>{ seller.pseudo }</h3>
          { seller.location && <p>{ seller.location }</p> }
         </section>
       </li>
      </ul>
     </div>
   </div>
  );
};

export default withRouter(ClassifiedAdvertisement);
