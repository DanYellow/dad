import React, { Component } from 'react';
import { withRouter } from 'react-router';


import './style.scss';

class Form extends Component {
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

  render() {
    return (
      <form onSubmit={ (e) => this._onSubmit(e) } className='form'>
      <fieldset className='main-input'>
        <input 
        ref={(ref) => this.searchInput = ref}
        type='text'
        maxLength='40'
        placeholder='Vous recherchez ?' />
        <button type='submit' className='reset'>X</button>
        </fieldset>
      </form>
    );
  }
}

export default withRouter(Form, { withRef: false });
