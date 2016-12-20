import React, {Component} from 'react';
import Select from 'react-select';
import uuid from 'node-uuid';

import APIManager from '../../../utils/APIManager';

import './style.scss';
import 'react-select/dist/react-select.css';


// https://github.com/JedWatson/react-select/issues/1129#issuecomment-241950075
// https://github.com/erikras/redux-form/issues/1185


// class CustomSelect extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isMounted: false,
//       value: "foo"
//     }
//   }
//   componentDidMount() {
//     this.setState({isMounted: true})
//   }

//   _getOptions() {
//     return APIManager.getCategories();
//   }

//   _handleInputChange(e) {
//     this.props.input.onChange(e);
//     this.props.input.value = e;
//     console.log(e.value);
//     this.setState({
//                 value: e.value
//             });
//   }

//   render() {
//     const { input, label } = this.props;
//   const id = uuid.v1();


//   let selectValue = {value: (this.props.input.value && typeof this.props.input.value === 'object') ? this.props.input.value.id : null};
  
//   if (this.props.input.value && typeof this.props.input.value === 'number') {
//     selectValue = {value: this.props.input.value}; 
//   }

//   const select = (this.state.isMounted) ? (<Select.Async
//         clearable={ false }
//         searchable={ true }
//         loadOptions={ this._getOptions }
//         placeholder={'Sélectionnez...'}
//         noResultsText={ 'Aucun résultat trouvé' }
//         id={ id }
//         value={this.state.value}
//         onBlurResetsInput={ false }
//         onBlur={ null }
//         onCloseResetsInput={ false }
//         onChange={ (e) => this._handleInputChange(e) }
//       />) : null;

//   return (
//     <div className='fieldset'>
//       <label htmlFor={ id }>{ label }</label>
//       { select }
//     </div>
//   )
//   }
// }

const CustomSelect = (props) => {
  const { input, label } = props;
  const id = uuid.v1();

  function handleInputChange({ value }) {
    props.input.onChange(value)
  }

  let selectValue = {value: (props.input.value && typeof props.input.value === 'object') ? props.input.value.id : null};
  
  if (props.input.value && typeof props.input.value === 'number') {
    selectValue = {value: props.input.value}; 
  }

  const getOptions = (input) => {
    return APIManager.getCategories();
  }

  return (
    <div className='fieldset'>
      <label htmlFor={ id }>{ label }</label>
      <Select.Async
        clearable={ true }
        searchable={ true }
        loadOptions={ getOptions }
        placeholder={'Sélectionnez...'}
        noResultsText={ 'Aucun résultat trouvé' }
        id={ id }
        {...Object.assign(input, selectValue)}
        onBlurResetsInput={false}
        onBlur={null}
        onCloseResetsInput={false}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default CustomSelect;
