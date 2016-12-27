import React, { Component } from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';

import CustomSelect from '../../_Form/CustomSelect'
import APIManager from '../../../utils/APIManager'

import './style.scss';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: this.props.location.query.q,
      showFilters: false,
      categoriesList: [],
      selectedCategory: ''
    }

    this.categoriesPromise = APIManager.getCategories(true);

    this.categoriesPromise.then((result) => {
      const options = [{label: 'Aucune catégorie', value: ''}, ...result.options.map((option) => {
        const suffix = (option.nb_items > 1) ? 'annonces' : 'annonce'; 
        const label = `${option.name} (${option.nb_items} ${suffix})`

        return {label: label, value: option.id }
      })];

      this.setState({ categoriesList: options });
    });
  }

  _onSubmit(e) {
    e.preventDefault();

    let { router } = this.props;
    let inputValue = this.searchInput.value;

    // We set 1 per default because or else 
    // we will asking to the API the n page for the query
    let url = '/classified_advertisements/1';

    // We remove filters if they are hidden
    const selectedCategory = (this.state.showFilters) ? this.state.selectedCategory : null;

    // Remove null/empty keys
    let query = _.pickBy({c: selectedCategory, q: inputValue}) 
    
    router.push({
      pathname: url,
      state: { from_query: true },
      query: query
    })
  }

  _inputValueChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  _toggleFilters() {
    this.setState({showFilters: !this.state.showFilters });
  }

  _renderFilters() {
    return (
      <div className='filters'>
        <CustomSelect defaultValue={ this.state.selectedCategory } items={this.state.categoriesList} onItemSelected={ (e) => this._onSelectChange(e) }/>
      </div>
    )
  }

  _onSelectChange(value) {
    this.setState({selectedCategory: value});
  }


  render() {
    return (
      <form onSubmit={ (e) => this._onSubmit(e) } className='form'>
        <fieldset>
          <div className='main-input'>
            <input 
            ref={(ref) => this.searchInput = ref}
            type='search'
            maxLength='40'
            value={ this.state.inputValue }
            onChange={ (e) => this._inputValueChange(e) }
            placeholder='Vous recherchez ?' />
            <button type='submit' className='reset'>
              <span className='icon-magnifier' />
            </button>
          </div>
        </fieldset>
        <button className='reset toggle-filters' type='button' onClick={ () => this._toggleFilters() }>
          { !this.state.showFilters && 'Plus de filtres' }
          { this.state.showFilters && 'Moins de filtres (Désactive les filtres)' }
        </button>
        { this.state.showFilters && this._renderFilters() }
      </form>
    );
  }
}

export default withRouter(Form, { withRef: false });
