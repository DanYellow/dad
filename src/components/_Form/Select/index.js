import React from 'react';
import uuid from 'node-uuid';
import Select from 'react-select';

import APIManager from '../../../utils/APIManager'

import './style.scss';
import 'react-select/dist/react-select.css';




class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { value:  this.props.input.value.id  };
  }

  onChange(value) {
    console.log(value)
    this.setState({ value });
  }

  render() {
    const id = uuid.v1();

    let { input, label, meta: { touched, error } } = this.props;

    const getOptions = (input) => {
      return APIManager.getCategories();
    }

    return (
      <div className='fieldset'>
        <label htmlFor={ id }>{ label }</label>
        <Select.Async
          name={ input.name }
          value={ this.state.value }
          loadOptions={ getOptions }
          onChange={ this.onChange.bind(this) }
        />

        { touched && (error && <div className='error'><p>{ error }</p></div>) }
      </div>
    );
  }
}

export default CustomSelect;