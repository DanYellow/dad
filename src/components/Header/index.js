import React, { Component, PropTypes } from 'react';
import './style.scss';

import TopHeader from './TopHeader';
import Form from './Form';

import logo from '../../images/logo.jpg';

class Header extends Component {
  render() {
    return (
      <header className='header'>
        <div className='app'>
          <TopHeader />
          <figure className='logo'><img src={logo} alt='logo site' /></figure>
          <Form />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  env: PropTypes.oneOf(['public', 'login', 'back'])
};

export default Header;
