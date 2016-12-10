import React, { Component } from 'react';
import { withRouter } from 'react-router';

import './App.scss';

import Header from './Header'

class App extends Component {
  render() {
    let env = 'public';
    if (this.props.router.routes[1].path.includes('sign')) {
      env = 'login'
    } else if (this.props.router.routes[1].path.includes('admin')) {
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
