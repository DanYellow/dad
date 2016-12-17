import React, { Component } from 'react';
import { Link } from 'react-router';

import moment from 'moment';

import Utils from '../../utils/Utils';
import Category from '../StandAlones/Category';
import PlaceholderImage from '../StandAlones/PlaceholderImage';

import './style.scss';

export default class ClassifiedAdvertisementListItem extends Component {
  render() {
    let { id, title, price, created_at, category, image } = this.props;
    let { location } = this.props.seller;

    let createdAt = moment(created_at, 'YYYY-MM-DD HH:mm:s').format('DD/MM/YYYY à HH[h]mm');
    let altImg = 'Annonce ' + title + ' image';

    return (
      <li className='classified_advertisement'>
        <Link to={ '/classified_advertisement/' + id } title={ 'Annonce :' + title }>
          <figure>
            { image && <img src={ image } width="160" alt={ altImg } /> }
            { !image && <PlaceholderImage /> }
          </figure>
          <article>
            <h3>{ title }</h3>
            { category && <Category {...category} /> }
            <p>{ location }</p>
            <p className='date'>{ 'Posté le ' + createdAt }</p>
          </article>
          { price > 0 && <h3 className='price'>{ Utils.formatCurrency(price) }</h3>}
          { price === 0 && <h3 className='price'>{ 'Gratuit' }</h3>}
        </Link>
      </li>
    );
  }
}
