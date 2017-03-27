import values from 'object.values';
import { combineReducers } from 'redux';
import drawer from './reducers/reducerDrawer';
import cameraMode from './reducers/reducerCameraMode';
import loading from './reducers/reducerLoading';
import wall from './reducers/reducerWall';
import room from './reducers/reducerRoom';
import camera from './reducers/reducerCamera';

const user = (state = {}, action) => {
  switch(action.type) {
    case 'fetchSignIn':
      // show loading
      return state;

    case 'onSignedIn':
      return action.payload || action.payload.user;

    case 'onSignedOut':
      return false;

    default:
      return state;
  }
};

const isSignedIn = (state = false, action) => {
  switch(action.type) {
    case 'onSignedIn':
      return true;

    case 'onSignedOut':
      return false;

    default:
      return state;
  }
};

const roomSelection = (state = 'none', action) => {
  switch(action.type) {
    case 'onRoomListing':
      return values(action.payload)[0].id;

    default:
      return state;
  }
};

const reducer = combineReducers({
  camera,
  user,
  isSignedIn,
  wall,
  loading,
  room,
  roomSelection,
  drawer,
  cameraMode
});

export default reducer;
