import React, { Component, PropTypes } from 'react';
import uuid from 'node-uuid';

import ClassifiedAdvertisementListItem from '../ClassifiedAdvertisementListItem';

import './style.scss';

export default class ClassifiedAdvertisementsList extends Component {

  render() {
    let { list, env } = this.props;

    return (
      <ul className='classified_advertisements'>
        {list.map((classifiedAdvertisement) => {
          return <ClassifiedAdvertisementListItem { ...classifiedAdvertisement } env={ env } key={ uuid.v1() } />
        })}
      </ul>
    );
  }
}

ClassifiedAdvertisementsList.propTypes = {
  list: PropTypes.array.isRequired,
};
