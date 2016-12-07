import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';

import uuid from 'node-uuid';

// import classNames from 'classnames';

import './style.scss';

class Pagination extends Component {

  _getListNumbers (datas) {
    let items = [];
    let url;
    let optionalParams;

    optionalParams = [this.props.params.query, this.props.params.category].filter(Boolean);
    optionalParams = optionalParams.join('/');

    for (var i = 1; i < datas.total_pages + 1; i++) {
      url = `classified_advertisements/${i}/${optionalParams}`
      items.push(
        <li key={ uuid.v1() }>
          <Link to={ url } activeClassName="active" className="number-item">
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
        <Link to={ 'classified_advertisements/' + pagination.prev } className="number-item">prev</Link>
        <ul className='number-items'>
          { this._getListNumbers(pagination) }
        </ul>
        <Link to={ 'classified_advertisements/' + pagination.next } className="number-item">next</Link>
      </div>
    );
  }
}

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired
};

export default withRouter(Pagination, { withRef: false });
