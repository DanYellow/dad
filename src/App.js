import React, { Component } from 'react';
import './App.scss';

import FlashMessage from './components/FlashMessage/index.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <FlashMessage message="Une erreur est survenue" type="error" />
        <FlashMessage message="Ceci est une information" type="info" />
        <FlashMessage message="Quelque chose s'est bien passé" type="success" />
      </div>
    );
  }
}

export default App;
