import React, { Component } from 'react';
import './style.scss';

import { Link } from 'react-router';


class TopHeader extends Component {
  _renderLoggedContent() {
    return (
      <ul>
          <li className='home'>
            <Link to={ '/'}>Accueil</Link>
          </li>

          <li>
            <Link to={ '/signin'}>Se connecter</Link>
          </li>
          <li>
            <Link to={ '/'}>Publier une annonce</Link>
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
