import React, { Component } from 'react';
import { withRouter } from 'react-router';

import moment from 'moment';

import APIManager from '../../utils/APIManager';

import Category from '../NonStandAlone/Category';

import './style.scss';

export default class ClassifiedAdvertisement extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { id, title, price, created_at, category, description } = this.props;

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
            <div></div>

          </article>
        </section>
      </div>
    );
  }
}


const ProductInfos = function (props) {
  let price = new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(props.price);
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

