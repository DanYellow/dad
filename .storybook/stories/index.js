import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import FlashMessage from '../../src/components/FlashMessage';
import ClassifiedAdvertisement from '../../src/components/ClassifiedAdvertisement';
import Pagination from '../../src/components/Pagination';


storiesOf('FlashMessage', module)
  .add('Error', () => (
    <FlashMessage message="Something very bad happened" type="error" />
  ))
  .add('Info', () => (
    <FlashMessage message="Something happened" type="info" />
  ))
  .add('Success', () => (
    <FlashMessage message="Something wonderful happened" type="success" />
  ));

let classifiedAdvertisementDatas = {
    "id": 48,
    "title": "Knack 2",
    "description": "Le jeu vient juste d'être annoncé, mais je le vend déjà",
    "price": "50.00",
    "created_at": "2016-12-05 00:31:43",
    "last_update": "2016-12-05 00:31:43",
    "category": {
        "id": 1,
        "name": "Jeux vidéo",
        "slug_name": "jeux-vid-o",
        "nb_items": 4
    },
    "is_mine": false,
    "seller": {
        "id": 1,
        "pseudo": "djeanlou",
        "location": null
    }
}

storiesOf('ClassifiedAdvertisement', module)
  .add('not connected / is not mine', () => (
    <ClassifiedAdvertisement { ...classifiedAdvertisementDatas } />
  ));

storiesOf('Pagination', module)
  .add('pagination', () => (
    <Pagination pagination={ {
        "current": 2,
        "first": 1,
        "last": 3,
        "prev": 1,
        "next": 3,
        "total_pages": 3,
        "total_items": 13
    } }/>
  ));