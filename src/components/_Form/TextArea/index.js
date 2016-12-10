import React from 'react';

import uuid from 'node-uuid';

import './style.scss';


const TextArea = function ({ input, label, type, meta: { touched, error, warning, placeholder }, ...extras }) {
  const id = uuid.v1();

  return (
    <div className='fieldset'>
      <label htmlFor={id}>{ label }</label>
      <textarea
      id={id}
      {...input}
      cols={10}
      placeholder={extras.placeholder || label} />

      { touched && (error && <div className='error'><p>{ error }</p></div>) }
      
    </div>
  );
};

export default TextArea;