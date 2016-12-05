import React, { Component } from 'react';
import './App.scss';

import FlashMessage from './components/FlashMessage/index.js'

import ClassifiedAdvertisementsContainer from './components/ClassifiedAdvertisementsContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <FlashMessage message="Une erreur est survenue" type="error" />
        <FlashMessage message="Ceci est une information" type="info" />
        <FlashMessage message="Quelque chose s'est bien passé" type="success" />

        <ClassifiedAdvertisementsContainer />
      </div>
    );
  }
}

export default App;
