import React, { Component } from 'react';
import { withRouter, Link } from 'react-router';

import moment from 'moment';

import Utils from '../../../utils/Utils';

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

  render() {
    const { resource, siblings } = this.props;
    const { title, price, created_at, category, description, is_mine, image, seller } = resource;
    const productInfos = { seller: seller, price }

    let createdAt = moment(created_at, 'YYYY-MM-DD HH:mm:s').format('DD/MM/YYYY à HH[h]mm');
    let altImg = title + ' image';

    return (
      <div className="ClassifiedAdvertisement">
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
            <ProductInfos {...productInfos} />
          </article>
        </section>
        <section className="siblings">
          <ul>
            <li>{ siblings.prev && 
              <Link to={ '/classified_advertisement/' + siblings.prev}> <span className='icon-arrow-left'></span> Annonce précédente</Link>}</li>
            <li>{ siblings.next && 
              <Link to={ '/classified_advertisement/' + siblings.next }><span className='icon-arrow-right'></span> Annonce suivante</Link>
            }</li>
          </ul>
        </section>
        { is_mine && this._renderFooter() }

        { this.props.children }
      </div>
    );
  }
}


const ProductInfos = function (props) {
  let price = props.price;
  if (price === 0) {
    price = 'Gratuit';
  } else {
    // price = price;
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
          <h3 title='Entrez ce pseudonyme dans Outlook si vous souhaitez contacter le propriétaire'>{ seller.pseudo }</h3>
          { seller.location && <p>{ seller.location }</p> }
         </section>
       </li>
      </ul>
     </div>
   </div>
  );
};

export default withRouter(ClassifiedAdvertisement);
