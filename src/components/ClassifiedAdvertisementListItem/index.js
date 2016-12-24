import React, { Component } from 'react';
import { Link } from 'react-router';

import moment from 'moment';

import Utils from '../../utils/Utils';
import Category from '../StandAlones/Category';
import PlaceholderImage from '../StandAlones/PlaceholderImage';

import './style.scss';

export default class ClassifiedAdvertisementListItem extends Component {
  render() {
    const { id, title, price, created_at, category, image, env, is_mine } = this.props;
    const { location, pseudo } = this.props.seller;
    const createdAt = moment(created_at, 'YYYY-MM-DD HH:mm:s').format('DD/MM/YYYY à HH[h]mm');
    const altImg = 'Illustration annonce ' + title;
    const suffix = (is_mine) ? " (C'est vous)" : '';

    let url = '/classified_advertisement/' + id;
    if (env === 'back') {
      url = 'admin/classified_advertisement/' + id;
    }

    let tplDate = 'Posté le ' + createdAt + ' par <b>' + pseudo + '</b>' + suffix;
    if (is_mine) {
      tplDate = 'Posté le ' + createdAt + ' par <b class="mine">' + pseudo + '</b>' + suffix
    }

    return (
      <li className='classified_advertisement'>
        <Link to={ url } title={ 'Consulter annonce : ' + title }>
          <figure>
            { image && <img src={ image } alt={ altImg } /> }
            { !image && <PlaceholderImage /> }
          </figure>
          <article>
            <h3>{ title }</h3>
            { category && <Category {...category} /> }
            <p>{ location }</p>
            <p className='date' dangerouslySetInnerHTML={{ __html: tplDate }} />
          </article>
          { price > 0 && <h3 className='price'>{ Utils.formatCurrency(price) }</h3>}
          { price === 0 && <h3 className='price'>{ 'Gratuit' }</h3>}
        </Link>
      </li>
    );
  }
}
