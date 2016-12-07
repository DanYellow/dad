import React, { Component } from 'react';
import './style.scss';

import TopHeader from './TopHeader';
import Form from './Form';

import logo from '../../images/logo.jpg';

class Header extends Component {
  render() {
    return (
      <header>
        <TopHeader />
        <figure className='logo'><img src={logo} alt='logo site' /></figure>
        <Form />
      </header>
    );
  }
}

export default Header;
