import React from 'react';
import Select from 'react-select';
import uuid from 'node-uuid';

import APIManager from '../../../utils/APIManager';

import './style.scss';
import 'react-select/dist/react-select.css';


// https://github.com/JedWatson/react-select/issues/1129#issuecomment-241950075

const CustomSelect = (props) => {
  const { children, input, label, value } = props;
  const id = uuid.v1();

  function handleInputChange({ value }) {
    props.input.onChange(value)
    // console.log("props.input", props.input)
  }

  // handleInputChange({value: 9})

  const getOptions = (input) => {
    return APIManager.getCategories();
  }
  console.log('input', input);
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
        {...Object.assign(input, {value: 9})}
        onBlurResetsInput={false}
        onCloseResetsInput={false}
        onChange={handleInputChange}
      />
    </label>
  )
}
export default CustomSelect;