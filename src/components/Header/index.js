import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import './style.scss';

import TopHeader from './TopHeader';
import SearchBar from './Form';

import logo from '../../images/logo.jpg';

class Header extends Component {

  _renderPublicView() {
    return (
      <SearchBar />
    )
  }

  _renderLoginView() {
    return (
      <nav className='navigation-header'>
        <ul>
          <li>
            <Link to='/signin' activeClassName='active'>
              <span>Connexion</span>
            </Link>
          </li>
          <li>
            <Link to='/signup' activeClassName='active'>
              <span>Inscription</span>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }

  _renderBackView() {
    return (
      <SearchBar />
    )
  }

  render() {
    return (
      <header className='header'>
        <div className='app'>
          <TopHeader />
          <Link to={'/'}>
            <figure className='logo'><img src={logo} alt='logo site' /></figure>
          </Link>
          { this.props.env === 'public' && this._renderPublicView() }
          { this.props.env === 'login' && this._renderLoginView() }
          { this.props.env === 'back' && this._renderBackView() }
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  env: PropTypes.oneOf(['public', 'login', 'back'])
};

export default Header;
