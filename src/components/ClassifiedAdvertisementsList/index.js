import React, { Component, PropTypes } from 'react';
import uuid from 'node-uuid';

import ClassifiedAdvertisement from '../ClassifiedAdvertisement';

import './style.scss';

export default class ClassifiedAdvertisementsList extends Component {

  render() {
    let { list } = this.props;

    return (
      <ul className='classified_advertisements'>
        {list.map((classifiedAdvertisement) => {
          return <ClassifiedAdvertisement {...classifiedAdvertisement} key={ uuid.v1() } />
        })}
      </ul>
    );
  }
}

ClassifiedAdvertisementsList.propTypes = {
  list: PropTypes.array.isRequired,
};
