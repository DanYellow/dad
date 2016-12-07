import React, { Component } from 'react';
// import classNames from 'classnames';

import './style.scss';


var NoResults = function (props) {
  return (
    <div className='no-results'>
      <h1>¯\_ツ_/¯</h1>
      <h3> Aucun résultat n'a été trouvé </h3>
    </div>
  );
};

export default NoResults;