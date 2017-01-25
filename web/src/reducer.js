import { combineReducers } from 'redux';
import values from 'object.values';

const camera = (state = { requestScreenshot: false, isPreviewing: false}, action) => {
  switch (action.type) {
    case 'onPreview':
      return {...state, isPreviewing: true};

    case 'onScreenShot':
      return {...state, isPreviewing: false, requestScreenshot: false};

    case 'requestScreenshot':
      return {...state, requestScreenshot: true};

    case 'onClosePreview':
      return {...state, isPreviewing: false};

    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch(action.type) {
    case 'fetchSignIn':
      // show loading
      return state;

    case 'onSignedIn':
      return action.payload || action.payload.user;

    case 'onSignedOut':
      return {};

    default:
      return state;
  }
}

const isSignedIn = (state = false, action) => {
  switch(action.type) {
    case 'onSignedIn':
      return true;

    case 'onSignedOut':
      return false;

    default:
      return state;
  }
}


const wall = (state = [], action) => {
  switch(action.type) {
    case 'onUpdate':
      return values(action.payload);

    default:
      return state;
  }
};

const reducer = combineReducers({
  camera,
  user,
  isSignedIn,
  wall
});

export default reducer;
