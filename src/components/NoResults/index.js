import React from 'react';

import { Button } from '../_Form/FormButton';

import './style.scss';


var NoResults = function (props) {
  let asciiShurgs = '¯\\_ツ_/¯';
  let message = props.message || 'Aucun résultat n\'a été trouvé';
  return (
    <div className='no-results'>
      <h1>{ asciiShurgs }</h1>
      <p>{ message }</p>
      <div className='buttons-container fieldset'>
        <Button design='validation' text='Publier une annonce' link='/classified_advertisement/create' />
      </div>
    </div>
  );
};

export default NoResults;