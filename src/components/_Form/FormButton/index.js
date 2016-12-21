import React, { PropTypes } from 'react';
import { Link } from 'react-router';

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

export const Button = function (props) {
  return (
    <Link to={ props.link } 
         className={ classNames('reset form-button', props.design)}>
          <span>{ props.text }</span>
    </Link>

  );
};

Button.propTypes = {
  design: PropTypes.oneOf(['validation', 'cancel', 'infos']),
  type: PropTypes.string,
  text: PropTypes.string,
};