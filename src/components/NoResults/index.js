import React from 'react';
import v from 'voca';

import { Button } from '../_Form/FormButton';

import './style.scss';


var NoResults = function ({message, query}) {
  let asciiShurgs = '¯\\_ツ_/¯';
  let stedsMessage = "Oh ! Vous en recherchez ? Renseignez-vous au deuxième étage. ;)"
  
  const slugifiedQuery = v.slugify(query);
  const userAskedForRoids = (slugifiedQuery === 'steroides' || slugifiedQuery === 'steroide') ? true : false;

  return (
    <div className='no-results'>
      <h1>{ asciiShurgs }</h1>
      <p>{ message || 'Aucun résultat n\'a été trouvé' }</p>
      <div className='buttons-container fieldset'>
        <Button design='validation' text='Publier une annonce' link='/classified_advertisement/create' />
      </div>
    { userAskedForRoids && <p className='small'>{ stedsMessage }</p> }
    </div>
  );
};

export default NoResults;
