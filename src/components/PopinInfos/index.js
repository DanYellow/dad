import React from 'react';
import classNames from 'classnames';

import FormButton from '../_Form/FormButton';

import './style.scss';



let PopinInfos = function (props) {
  let message = props.message || 'Pas de message';
  return (
    <div className={ classNames('PopinInfos', props.type) }>
      { props.type === 'warning' && <h1 className='icon-warning'></h1> }
      { props.type === 'forbidden' && <h1 className='icon-forbidden'></h1> }
      
      <p>{ message }</p>
      <div className='buttons-container'>
        <FormButton design='cancel' text='Fermer' type='button' onClick={ props.onClick } />
      </div>
    </div>
  );
};

export default PopinInfos;