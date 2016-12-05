import React, { Component, PropTypes } from 'react';

import './style.scss';

export default class ClassifiedAdvertisement extends Component {
  render() {
    let { title, price, created_at, category, is_mine } = this.props;
    let { pseudo, location } = this.props.seller;

    return (
      <li className='classified_advertisement'>
        <figure>
          <img src="https://placekitten.com/g/300/300" width="220" alt={title + " image"} />
        </figure>
        <article>
          <h3>{ title }</h3>

          <p>{ created_at }</p>
        </article>
      </li>
    );
  }
}

ClassifiedAdvertisement.propTypes = {
  data: PropTypes.object.isRequired,
};
