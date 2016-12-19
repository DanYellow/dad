import React from 'react';

import './style.scss';

const Category = function ({name, nb_items}) {
  return (
   <div>
     <span className='category' title={nb_items + ' élements dans la catégorie'}>{ name }</span>
   </div>
  );
};

export default Category;