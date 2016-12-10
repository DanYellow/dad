import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import './style.scss';

import TopHeader from './TopHeader';
import Form from './Form';

import logo from '../../images/logo.jpg';

class Header extends Component {

  _renderPublic() {
    return (
      <Form />
    )
  }

  _renderLogin() {
    return (
      null
    )
  }

  _renderBack() {
    return (
      <Form />
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
          { this.props.env === 'public' && this._renderPublic() }
          { this.props.env === 'login' && this._renderLogin() }
          { this.props.env === 'back' && this._renderBack() }
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  env: PropTypes.oneOf(['public', 'login', 'back'])
};

export default Header;
