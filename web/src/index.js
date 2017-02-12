/*global document */

import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import { create } from './store';
import * as firebase from 'firebase';
import config from '../config.json';

firebase.initializeApp(config);

const store = create();

render(
  <Root store={store} />,
  document.getElementById('root')
);
