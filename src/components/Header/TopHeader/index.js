import React, { Component } from 'react';
import './style.scss';

import { Link } from 'react-router';


class TopHeader extends Component {
  _renderLoggedContent() {
    return (
      <ul>
          <li>
            <Link to={ '/login'} className="number-item">Se connecter</Link>
          </li>
          <li>
            <Link to={ '/'} className="number-item">Publier une annonce</Link>
          </li>
      </ul>
    )
  }

  render() {
    return (
      <nav className='navigation'>
        { this._renderLoggedContent() }
      </nav>
    );
  }
}

export default TopHeader;
