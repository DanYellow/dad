import React from 'react';

import './style.scss';

const Category = function ({name, nb_items}) {
  return (
   <div>
     <span className='category' title={ nb_items + ' élement(s) dans la catégorie' }>{ name }</span>
   </div>
  );
};

export default Category;