import React, { Component } from 'react';
import { withRouter } from 'react-router';


import './style.scss';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: this.props.params.query
    }
  }

  _onSubmit(e) {
    e.preventDefault();

    let { router, params } = this.props;
    let inputValue = this.searchInput.value;
    // We set 1 per default because or else we will asking to the API the n page for the query
    let url = `/classified_advertisements/1/${inputValue}`

    if (params.category) {
      url += `/${params.category}`
    }

    router.push(url);
  }

  _inputValueChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    return (
      <form onSubmit={ (e) => this._onSubmit(e) } className='form'>
      <fieldset>
        <div className='main-input'>
          <input 
          ref={(ref) => this.searchInput = ref}
          type='text'
          maxLength='40'
          value={ this.state.inputValue }
          onChange={ (e) => this._inputValueChange(e) }
          placeholder='Vous recherchez ?' />
          <button type='submit' className='reset'>
          <span className='icon-magnifier' />
          </button>
        </div>
        </fieldset>
      </form>
    );
  }
}

export default withRouter(Form, { withRef: false });
