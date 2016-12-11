import React from 'react';

import './style.scss';


var NoResults = function (props) {
  let asciiShurgs = '¯\\_ツ_/¯';
  let message = props.message || 'Aucun résultat n\'a été trouvé';
  return (
    <div className='no-results'>
      <h1>{ asciiShurgs }</h1>
      <p>{ message }</p>
    </div>
  );
};

export default NoResults;