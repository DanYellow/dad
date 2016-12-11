import React, { PropTypes } from 'react';

import classNames from 'classnames';

import './style.scss';

const FormButton = function (props) {
  return (
   <button className={ classNames('reset form-button', props.design) } 
           type={ props.type || 'submit' }
           onClick={ props.onClick }
           >{props.text}</button>
  );
};

FormButton.propTypes = {
  design: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
};

export default FormButton
