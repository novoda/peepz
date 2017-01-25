import React from 'react';
import { render } from 'react-dom';
import RootContainer from './containers/RootContainer';
import { create } from './store';
import * as firebase from 'firebase';
import config from '../config.json';

firebase.initializeApp(config);

const store = create();

render(
  <RootContainer store={store} />,
  document.getElementById('root')
);
