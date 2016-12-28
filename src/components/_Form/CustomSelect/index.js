import React from 'react';
import uuid from 'node-uuid';

import './style.scss';

const CustomSelect = function ({items, onItemSelected, defaultValue = '', mainLabel}) {
  let options = [];

  items.forEach(function(item) {
    options.push(<option key={uuid.v1()} value={item.value}>{ item.label }</option>)
  });

  function itemSelected(e) {
    onItemSelected(e.target.value)
  }

  return (
    <div className='CustomSelectContainer'>
      { mainLabel && <p>{mainLabel}</p> }
      <div className='CustomSelect'>
        <span className='icon icon-bottomarrow' />
        <select 
          value={ defaultValue }
          onChange={ itemSelected }>
            { options }
        </select>
      </div>
    </div>
  );
};

export default CustomSelect;