import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './FlashMessage.scss';

import classNames from 'classnames';

export default class FlashMessage extends Component {
  constructor(props) {
    super(props);
    
    
    this.state = {
      closed: false
    }
  }

  componentDidMount() {
    this.DOMRef = ReactDOM.findDOMNode(this);
  }

  /**
   * Remove flash message
   * @return null
   */
  remove() {
    this.setState({closed: !this.state.closed});
    setTimeout( () => {
      this.DOMRef.parentNode.removeChild(this.DOMRef);
    }, 750);
  }

  render() {
    let { type, message } = this.props;

    return (
      <div className={ classNames('flash-message', 
                                  type,
                                  { 'closed': this.state.closed }) }>
        <p>{ message || "Pas de message ?!" }</p>
        <button title="Fermer élement" onClick={ () => this.remove() }></button>
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};
