import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import FlashMessage from '../../src/components/FlashMessage';


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