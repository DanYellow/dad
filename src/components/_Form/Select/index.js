import React from 'react';
import Select from 'react-select';
import uuid from 'node-uuid';

import APIManager from '../../../utils/APIManager';

import './style.scss';
import 'react-select/dist/react-select.css';


// https://github.com/JedWatson/react-select/issues/1129#issuecomment-241950075
// https://github.com/erikras/redux-form/issues/1185

const CustomSelect = (props) => {
  const { input, label } = props;
  const id = uuid.v1();

  function handleInputChange({ value }) {
    props.input.onChange(value)
  }

  let selectValue = {value: (props.input.value && typeof props.input.value === 'object') ? props.input.value.id : null};
  
  if (props.input.value && typeof props.input.value === 'number') {
    selectValue = {value: props.input.value}; 
  }

  const getOptions = (input) => {
    return APIManager.getCategories();
  }

  return (
    <div className='fieldset'>
      <label htmlFor={ id }>{ label }</label>
      <Select.Async
        clearable={ false }
        searchable={ true }
        loadOptions={ getOptions }
        placeholder={'Sélectionnez...'}
        noResultsText={ 'Aucun résultat trouvé' }
        id={ id }
        {...Object.assign(input, selectValue)}
        onBlurResetsInput={false}
        onBlur={null}
        onCloseResetsInput={false}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default CustomSelect;
