import React, { Component } from 'react';
import { Link } from 'react-router';

import moment from 'moment';

import './style.scss';

export default class ClassifiedAdvertisement extends Component {
  render() {
    let { id, title, price, created_at, category } = this.props;
    let { location } = this.props.seller;

    return (
      <li className='classified_advertisement'>
        <Link to={ '/' + id }>
          <figure>
            <img src="https://placekitten.com/g/300/300" width="220" alt={title + ' image'} />
          </figure>
          <article>
            <h3>{ title }</h3>
            { category && <Category {...category} /> }
            <p>{ location }</p>
            <p className='date'>{ 'Posté le ' + created_at }</p>
          </article>
          { price > 0 && <h3 className='price'>{ new Intl.NumberFormat("fr-FR", {style: 'currency', currency: 'EUR'}).format(price) }</h3>}
          { price === 0 && <h3 className='price'>{ 'Gratuit' }</h3>}
        </Link>
      </li>
    );
  }
}

class Category extends Component {
  render() {
    let { name } = this.props;

    return (
      <div>
        <span className='category'>{ name }</span>
      </div>
    )
  }
}
