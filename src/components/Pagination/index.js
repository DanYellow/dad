import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';


import uuid from 'node-uuid';

import classNames from 'classnames';

import './style.scss';

class Pagination extends Component {

  _getListNumbers (datas) {
    let items = [];
    let url;
    let optionalParams;

    let currentPage = datas.current;
    
    let maxElement = 4 + currentPage;
    let minElement = currentPage - 2;

    let displayedEllipsis = false;

    optionalParams = [this.props.params.query, this.props.params.category].filter(Boolean);
    optionalParams = optionalParams.join('/');
    
    for (var i = 1; i < datas.total_pages + 1; i++) {
      let element;
      url = `classified_advertisements/${i}/${optionalParams}`;
      if (i > maxElement && !displayedEllipsis) {
        displayedEllipsis = true;
        element = (<li key={ uuid.v1() }>
          <span className='number-item ellipsis'>
          [...]
          </span>
        </li>)
      } 

      if ((i < maxElement && i >= minElement) || i === datas.total_pages || i === 1) {
        element = (<li key={ uuid.v1() }>
          <Link to={ url }  key={ uuid.v1() } activeClassName='active' className='number-item'>
            {i}
          </Link>
        </li>)
      }

      items.push(element);
    };
    return items;
  }

  render() {
    let pagination = this.props.pagination;

    return (
      <div className='pagination'>
        <Link to={ 'classified_advertisements/' + pagination.prev } 
              className={ classNames('icon-arrow pagination-arrow',
                                  { 'disabled': !pagination.prev }) }/>
        <ul className='number-items'>
          { this._getListNumbers(pagination) }
        </ul>
        <Link to={ 'classified_advertisements/' + pagination.next } 
              className={ classNames('icon-arrow-right icon-arrow pagination-arrow',
                                  { 'disabled': !pagination.next }) }/>
      </div>
    );
  }
}

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired
};

export default withRouter(Pagination, { withRef: false });
