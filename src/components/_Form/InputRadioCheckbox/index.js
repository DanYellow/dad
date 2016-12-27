import React from 'react';

import uuid from 'node-uuid';

import './index.scss';


const Radio = function ({ datas, name, mainLabel, onItemSelected }) {
  let choices = [];

  datas.forEach(function(item) {
    choices.push(createRadio(item))
  });

  function itemSelected(e) {
    onItemSelected(e.target.value)
  }

  function createRadio({value, label, checked }) {
    const id = uuid.v1();
    return (
      <div className='Radio' key={ id }>
        <input type='radio' id={ id } name={ name }
               onChange={ itemSelected }
               value={value} defaultChecked={checked}/>
        <label htmlFor={ id }>
          <span className='indicator'/>
          <span className='label'>{ label }</span>
        </label>
      </div>
    )
  }
  
  return (
    <fieldset className='InputRadiosCheckboxes'>
      { mainLabel && <p>{mainLabel}</p> }
      <div className='container'>{choices}</div>
    </fieldset>
  );
};

export { Radio };


const Checkbox = function ({ datas, name, mainLabel, onItemSelected }) {
  let choices = [];

  datas.forEach(function(item) {
    choices.push(createCheckbox(item))
  });

  function itemSelected(e) {
    onItemSelected(e.target.value)
  }

  function createCheckbox({value, label, checked}) {
    const id = uuid.v1();
    return (
      <div className='Checkbox' key={ id }>
        <input type='checkbox' id={ id } 
               name={ name } value={value} defaultChecked={checked} onChange={ itemSelected }/>
        <label htmlFor={ id }>
          <span className='indicator'/>
          <span className='label'>{ label }</span>
        </label>
      </div>
    )
  }
  
  return (
    <fieldset className='InputRadiosCheckboxes'>
      { mainLabel && <p>{mainLabel}</p> }
      <div className='container'>{choices}</div>
    </fieldset>
  );
};

export { Checkbox };
