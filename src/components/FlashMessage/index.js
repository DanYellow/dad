import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import './style.scss';

export default class FlashMessage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      closed: false
    }
  }

  componentDidMount() {
    this.DOMRef = ReactDOM.findDOMNode(this);
    // APIManager.getClassifiedAdvertisements(undefined, undefined, this.hello, this.hello2)
  }

  /**
   * Remove flash message
   * @return null
   */
  remove() {
    this.setState({closed: !this.state.closed});

    setTimeout(() => {
      this.refs.flashmessage.parentNode.removeChild(this.DOMRef);
    }, 750);
  }

  render() {
    let { type, message } = this.props;

    return (
      <div className={ classNames('flash-message',
                                  type,
                                  { 'closed': this.state.closed }) }
           ref="flashmessage">
        <p>{ message || "Pas de message ?!" }</p>
        <button title="Fermer message" onClick={ () => this.remove() }></button>
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};
