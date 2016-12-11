import React, { Component } from 'react';
import { withRouter, Link } from 'react-router';

import moment from 'moment';

import Category from '../../StandAlones/Category';

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
    let { title, price, created_at, category, description, is_mine } = this.props;
    let productInfos = { seller: this.props.seller, price }

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
            <img src="https://placekitten.com/g/300/300" width="250" alt={ altImg } />
          </figure>
          <article className='content'>
            <header>
              <h3>Description</h3>
              <p>{ description }</p>
            </header>
            <ProductInfos {...productInfos} />
          </article>
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
    price = new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(price);
  }
  
  let { seller } = props;

  return (
   <div className='SellerInfos'>
    <div className='wrapper'>
     <ul>
       <li>
         <h5>Prix</h5>
         <p className='price'>{ price }</p>
       </li>
       <li>
         <h5>Vendeur</h5>
         <section className='seller'>
          <h3 title='Entre ce pseudo dans Outlook si tu veux contacter le propriétaire'>{ seller.pseudo }</h3>
          { seller.location && <p>{ seller.location }</p> }
         </section>
       </li>
      </ul>
     </div>
   </div>
  );
};

export default withRouter(ClassifiedAdvertisement);
