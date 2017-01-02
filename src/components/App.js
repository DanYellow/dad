import React, { Component } from 'react';
import { withRouter } from 'react-router';

import './App.scss';

import Header from './Header'
import Utils from '../utils/Utils'

class App extends Component {
  render() {
    if (Utils.aPopinIsOpened(this.props.location.pathname)) {
      document.getElementsByTagName('body')[0].classList.add('show-popin');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('show-popin');
    }
    
    const env = Utils.getCurrentEnvironment(this.props.location.pathname);

    return (
      <div>
        <Header env={env} />
        { this.props.children }
        <footer className='footer'>Projet D-A-D, un site de petites annonces</footer>
      </div>
    );
  }
}

export default withRouter(App);
