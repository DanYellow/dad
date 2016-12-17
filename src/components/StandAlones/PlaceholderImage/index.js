import React from 'react';

import './style.scss';

const PlaceholderImage = function () {
  return (
   <div className='PlaceholderImage'>
     <p className='icon-imagenotfound' />
     <p>Pas d'image</p>
   </div>
  );
};

export default PlaceholderImage;