import React from 'react';
import Select from 'react-select';
import uuid from 'node-uuid';

import APIManager from '../../../utils/APIManager';

import './style.scss';
import 'react-select/dist/react-select.css';


// https://github.com/JedWatson/react-select/issues/1129#issuecomment-241950075

const CustomSelect = (props) => {
  const { children, input, label } = props;
  const id = uuid.v1();

  function handleInputChange({ value }) {
    props.input.onChange(value)
  }

  const getOptions = (input) => {
    return APIManager.getCategories();
  }

  return (
    <label className={props.className}>
      <label htmlFor={ id }>{ label }</label>
      <Select.Async
        clearable={ false }
        searchable={ false }
        loadOptions={ getOptions }
        placeholder={'Sélectionnez...'}
        noResultsText={ 'Aucun résultat trouvé' }
        id={ id }
        {...input}
        onBlurResetsInput={false}
        onCloseResetsInput={false}
        onChange={handleInputChange}
      />
    </label>
  )
}
export default CustomSelect;