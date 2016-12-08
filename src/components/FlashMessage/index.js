import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './style.scss';

export default class FlashMessage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      closed: false
    }
  }

  /**
   * Remove flash message
   * @param  {Object} e     Event
   * @param  {Number} delay Delay of before remove flash message
   * @return null
   */
  remove(e, delay = 750) {
    let flashmessage = this.flashmessage;
    
    // We check if the action is trigged by an user
    if (!e.isTrusted) {
      delay = e;
      setTimeout(() => {
        this.setState({closed: !this.state.closed});
      }, delay - 550);
    } else {
      this.setState({closed: !this.state.closed});
    }

    setTimeout(() => {
      flashmessage.parentNode.removeChild(flashmessage);
    }, delay);
  }

  componentDidMount() {
    if (this.props.autodelete) {
      this.remove(3000);
    }
  }

  render() {
    let { type, message } = this.props;

    return (
      <div id={type} className={ classNames('flash-message',
                                  type,
                                  { 'closed': this.state.closed }) }
           ref={(ref) => this.flashmessage = ref}>
        <p>{ message || 'Pas de message ?!' }</p>
        <button title='Fermer message' className='reset icon-close' onClick={ (e) => this.remove(e) }></button>
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};
