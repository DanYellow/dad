import React from 'react';
import Select from 'react-select';
import uuid from 'node-uuid';

import './style.scss';
import 'react-select/dist/react-select.css';


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

  return (
    <div className='fieldset'>
      <label htmlFor={ id }>{ label }</label>
      <Select
        clearable={ false }
        searchable={ true }
        options={ props.options }
        placeholder={'Sélectionnez...'}
        noResultsText={ 'Aucun résultat trouvé' }
        id={ id }
        { ...Object.assign(input, selectValue) }
        onBlurResetsInput={ false }
        onBlur={ null }
        onCloseResetsInput={ false }
        onChange={ handleInputChange }
      />
    </div>
  )
}

export default CustomSelect;
