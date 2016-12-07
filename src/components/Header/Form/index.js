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

  // componentDid

  _onSubmit(e) {
    e.preventDefault();

    let { router, params } = this.props;
    let inputValue = this.searchInput.value;
    let url = `/classified_advertisements/${params.id}/${inputValue}`

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
          <button type='submit' className='reset'>X</button>
        </div>
        </fieldset>
      </form>
    );
  }
}

export default withRouter(Form, { withRef: false });
