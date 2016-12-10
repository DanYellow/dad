import React from 'react';

import './style.scss';


const InputLitteral = function ({ input, label, type, meta: { touched, error, warning } }) {
  return (
    <div className='fieldset'>
      <label>{ label }</label>
      <input 
      {...input}
      placeholder={label} type={type} />

      { touched && (error && <div className='error'><p>{ error }</p></div>) }
      
    </div>
  );
};

export default InputLitteral;