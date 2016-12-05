import React, { Component } from 'react';
import './App.scss';

import FlashMessage from './components/FlashMessage/index.js'
import Pagination from './components/Pagination'

class App extends Component {
  render() {
    return (
      <div className="App">
        <FlashMessage message="Une erreur est survenue" type="error" />
        <FlashMessage message="Ceci est une information" type="info" />
        <FlashMessage message="Quelque chose s'est bien passé" type="success" />

        <Pagination pagination={{
        "current": 1,
        "first": 1,
        "last": 3,
        "prev": 1,
        "next": 2,
        "total_pages": 3,
        "total_items": 13
    }}/>
      </div>
    );
  }
}

export default App;
