import React from 'react';

import './style.scss';

const Category = function (props) {
  return (
   <div>
     <span className='category'>{ props.name }</span>
   </div>
  );
};

export default Category;