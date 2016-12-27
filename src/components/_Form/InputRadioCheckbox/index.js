import React from 'react';

import uuid from 'node-uuid';

import './index.scss';


const Radio = function ({ radios, name, mainLabel }) {
  let choices = [];

  radios.forEach(function(item) {
    choices.push(createRadio(item))
  });

  function createRadio({value, label, checked}) {
    const id = uuid.v1();
    return (
      <div className='Radio' key={ id }>
        <input type='radio' id={ id } name={ name } value={value}/>
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
