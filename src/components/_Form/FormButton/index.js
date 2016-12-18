import React, { PropTypes } from 'react';

import classNames from 'classnames';

import './style.scss';

const FormButton = function (props) {
  return (
   <button className={ classNames('reset form-button', props.design) } 
           type={ props.type || 'submit' }
           onClick={ props.onClick }
           disabled={ props.disabled || false }
           >{props.text}</button>
  );
};

FormButton.propTypes = {
  design: PropTypes.oneOf(['validation', 'cancel', 'info']),
  type: PropTypes.string,
  text: PropTypes.string,
};

export default FormButton
