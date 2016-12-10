import React from 'react';

import uuid from 'node-uuid';

import './style.scss';


const InputLitteral = function ({ input, label, type, meta: { touched, error, warning, placeholder }, ...extras }) {
  const id = uuid.v1();
  
  return (
    <div className='fieldset'>
      <label htmlFor={id}>{ label }</label>
      <input
      id={id}
      {...input}
      placeholder={extras.placeholder || label} type={type} />

      { touched && (error && <div className='error'><p>{ error }</p></div>) }
      
    </div>
  );
};

export default InputLitteral;