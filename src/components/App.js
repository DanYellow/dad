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
    
    let env = 'public';
    if (this.props.location.pathname.includes('sign')) {
      env = 'login'
    } else if (this.props.location.pathname.includes('admin')) {
      env = 'back'
    }

    return (
      <div>
        <Header env={env} />
        { this.props.children }
      </div>
    );
  }
}

export default withRouter(App);
