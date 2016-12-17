import React from 'react';

import './style.scss';

const Category = function ({name}) {
  return (
   <div>
     <span className='category'>{ name }</span>
   </div>
  );
};

export default Category;