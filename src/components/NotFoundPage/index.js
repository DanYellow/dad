import React, { Component } from 'react';
import _ from 'lodash';
import Helmet from 'react-helmet';

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

    APIManager.getRandomTweet(this._successGetTweets.bind(this), this._failedGetTweets.bind(this) )
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

  _failedGetTweets(datas) {
    this.setState({ tweet: {text: 'Woops, pas de tweet sous la main'} })
  }

  /**
   * Sets a random tweet to tweet state
   * @return null
   */
  _getRandomTweet() {
    // Tweets are not loaded
    if (!this.tweets.length) { return }
    this.setState({ tweet: _.sample(this.tweets) })
  }

  render() {
    return (
      <div className='App NotFoundPage'>
        <Helmet title={ '404 - Page non trouvée' } />
        <header className='bordered-title'>
          <h2 >404</h2> 
          <p>Page non trouvée</p>
          <p>Hum, il semblerait que vous vous soyez perdu... un petit tweet avant de repartir ?</p>
        </header>

        <section className='tweet'>
          <blockquote cite={ this.state.tweet.cite } onClick={() => this._getRandomTweet()}>
            { this.state.tweet.text }
          </blockquote>
          <footer>
            <div className='border' />
            <span>
              Encore plus de tweets sur <a href={this.baseTweetURL}>@digitwitas</a>
            </span>
          </footer>
        </section>

      </div>
    );
  }
}
