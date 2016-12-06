import React, { Component } from 'react';
import './style.scss';


class Form extends Component {
  _onSubmit(e) {
    e.preventDefault();
    
    console.log(this);
  }

  render() {
    return (
      <form onSubmit={ (e) => this._onSubmit(e) } className='form'>
      <fieldset className='main-input'>
        <input 
        ref={(ref) => this.searchInput = ref}
        type='search'
        placeholder='Vous recherchez ?' />
        <button type='submit' className='reset'>X</button>
        </fieldset>
      </form>
    );
  }
}

export default Form;
