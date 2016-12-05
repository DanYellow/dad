import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

// import classNames from 'classnames';

import './style.scss';

export default class Pagination extends Component {

  _getListNumbers (datas) {
    let items = []
    for (var i = 1; i < datas.total_pages + 1; i++) {
      items.push(
        <li>
          <Link to={'/list/' + i} activeClassName="active" className="number-item">
            {i}
          </Link>
        </li>
      );
    };
    return items;
  }

  render() {
    return (
        <div className='pagination'>
          <ul className='number-items'>
            { this._getListNumbers(this.props.pagination) }
          </ul>
        </div>      
    );
  }
}

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired
};
