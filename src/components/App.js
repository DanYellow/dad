import React, { Component } from 'react';
import { withRouter } from 'react-router';

import './App.scss';

import Header from './Header'

class App extends Component {
  render() {
    console.log(this.props.router)

    let env = 'public';
    if (this.props.router.routes[1].path.includes('sign')) {
      env = 'login'
    } else if (this.props.router.routes[1].path.includes('admin')) {
      env = 'back'
    }

    return (
      <div>
        <Header env={env} />
        {/*<FlashMessage message="Une erreur est survenue" type="error" />
        <FlashMessage message="Ceci est une information" type="info" />
        <FlashMessage message="Quelque chose s'est bien passé" type="success" /> */}
        { this.props.children }
      </div>
    );
  }
}

export default withRouter(App);
