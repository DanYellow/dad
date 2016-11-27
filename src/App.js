import React, { Component } from 'react';
import './App.scss';

import FlashMessage from './components/FlashMessage/index.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <FlashMessage message="Hello" type="error" />
        <FlashMessage message="Hello" type="info" />
        <FlashMessage message="Hello" type="success" />
      </div>
    );
  }
}

export default App;
