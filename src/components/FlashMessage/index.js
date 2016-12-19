import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import uuid from 'node-uuid';

import Utils from '../../utils/Utils';

import './style.scss';

export default class FlashMessage extends Component {
  constructor(props) {
    super(props);
    
    this.id = uuid.v1();

    this.state = {
      closed: false,
      mustBeRemoved: false
    }
  }

  /**
   * Remove flash message
   * @param  {Object} e     Event
   * @param  {Number} delay Delay of before remove flash message
   * @return null
   */
  _remove(e, delay = 750) {    
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
      this.setState({ mustBeRemoved: !this.state.mustBeRemoved });
      this.props.onClick();
    }, delay);
  }

  _scrollTo() {
    let DOMElement = document.getElementById(this.id);
    if (!DOMElement) { return; }

    setTimeout(() => {
      if (Utils.aPopinIsOpened()) {
        DOMElement.parentNode.scrollTop = DOMElement.offsetTop;
      } else {
        document.getElementById(this.id).scrollIntoView();
      }
    }, 1000);
  }

  componentDidMount() {
    if (this.props.autodelete) {
      // this.remove(3000);
    }
    this._scrollTo();
  }

  render() {
    let { type, message } = this.props;

    return (
      <div id={this.id} className={ classNames('flash-message',
                                  type,
                                  { 'closed': this.state.closed, 
                                    'must-be-removed': this.state.mustBeRemoved }) }
           ref={(ref) => this.flashmessage = ref}>
        <p>{ message || 'Pas de message ?!' }</p>
        <button title='Fermer message' className='reset icon-close' onClick={ (e) => this._remove(e) }></button>
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};
