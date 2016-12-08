import React from 'react';
// import classNames from 'classnames';

import './style.scss';


var NoResults = function (props) {
  let asciiShurgs = '¯\_ツ_/¯';
  return (
    <div className='no-results'>
      <h1>{ asciiShurgs }</h1>
      <h3> Aucun résultat n'a été trouvé </h3>
    </div>
  );
};

export default NoResults;