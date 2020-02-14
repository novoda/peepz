/*global document */

import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root'
import { create } from './store'
import * as firebase from 'firebase'
import config from '../config.json'
import injectTapEventPlugin from 'react-tap-event-plugin'

firebase.initializeApp(config)
injectTapEventPlugin()

const store = create(firebase)

render(<Root store={store} />, document.getElementById('root'))
