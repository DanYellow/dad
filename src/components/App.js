import React, { Component } from 'react';
import './App.scss';

import FlashMessage from './FlashMessage/index.js'
import ClassifiedAdvertisementsContainer from './ClassifiedAdvertisementsContainer'
import Header from './Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <FlashMessage message="Une erreur est survenue" type="error" />
        <FlashMessage message="Ceci est une information" type="info" />
        <FlashMessage message="Quelque chose s'est bien passé" type="success" />

        <ClassifiedAdvertisementsContainer />
      </div>
    );
  }
}

export default App;
