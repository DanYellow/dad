import React, { Component } from 'react';
import _ from 'lodash';

import './style.scss';

import APIManager from '../../utils/APIManager';

export default class NotFoundPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tweet: { text: 'Chargement...', cite: 'Un chargeur' }
    }

    this.tweets = []

    this.baseTweetURL = 'https://twitter.com/digitwitas/status/'

    APIManager.getRandomTweet(this._successGetTweets.bind(this), null)
  }

  /**
   * Returns a clear array of tweets, only tweets
   * @param  {Array} datas Raw datas from API
   * @return Array Cleared datas
   */
  _clearTweets(tweets) {
    return tweets.map(function(tweet) {
      return {text: tweet.text, cite:  tweet.id_str };
    })
  }

  _successGetTweets(datas) {
    this.tweets = this._clearTweets(datas)

    this._getRandomTweet()
  }

  /**
   * Sets a random tweet to tweet state
   * @return null
   */
  _getRandomTweet() {
    this.setState({ tweet: _.sample(this.tweets) })
  }

  render() {
    return (
      <div className='App NotFoundPage'>
        <header className='bordered-title'>
          <h2 >404</h2> 
          <p>Page non trouvée</p>
          <p>Hum, il semblerait que vous vous soyez perdu... un petit tweet avant de repartir ?</p>
        </header>

        <section className='tweet'>
          <blockquote cite={ this.state.tweet.cite } onClick={() => this._getRandomTweet()}>
            { this.state.tweet.text }
          </blockquote>
        </section>

      </div>
    );
  }
}
