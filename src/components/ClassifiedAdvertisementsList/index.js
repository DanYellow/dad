import React, { Component, PropTypes } from 'react';
import uuid from 'node-uuid';
import Helmet from 'react-helmet';

import ClassifiedAdvertisementListItem from '../ClassifiedAdvertisementListItem';

import './style.scss';

export default class ClassifiedAdvertisementsList extends Component {

  render() {
    let { list, env } = this.props;

    return (
      <ul className='classified_advertisements'>
        <Helmet title={ "Liste des annonces" } />
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
