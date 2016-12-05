import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import uuid from 'node-uuid';

// import classNames from 'classnames';

import './style.scss';

export default class Pagination extends Component {

  _getListNumbers (datas) {
    let items = []
    for (var i = 1; i < datas.total_pages + 1; i++) {
      items.push(
        <li key={uuid.v1()}>
          <Link to={'/' + i} activeClassName="active" className="number-item">
            {i}
          </Link>
        </li>
      );
    };
    return items;
  }

  render() {
    let pagination = this.props.pagination;

    return (
        <div className='pagination'>
          <Link to={ '/' + pagination.prev } activeClassName="active" className="number-item">prev</Link>
          <ul className='number-items'>
            { this._getListNumbers(pagination) }
          </ul>
          <Link to={ '/' + pagination.next } activeClassName="active" className="number-item">next</Link>
        </div>      
    );
  }
}

// "pagination": {
//         "current": 1,
//         "first": 1,
//         "last": 3,
//         "prev": 1,
//         "next": 2,
//         "total_pages": 3,
//         "total_items": 13
//     }

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired
};
