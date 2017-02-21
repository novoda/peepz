import { combineReducers } from 'redux';
import values from 'object.values';

const camera = (state = { requestScreenshot: false, isPreviewing: false , manualScreenshot: false}, action) => {
  switch (action.type) {
    case 'showPreview':
      return {...state, active: true};

    case 'closePreview':
      return {...state, active: false};

    case 'automaticScreenshot':
      return {...state, active: true, requestAutomaticScreenshot: true};

    case 'manualScreenshot':
      return {...state, requestManualScreenshot: true};

    case 'closeCamera':
      return { active: false, requestManualScreenshot: false , requestAutomaticScreenshot: false};

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

const loading = (state = { isLoadingSignIn: true, isLoadingRoom: true }, action) => {
  switch(action.type) {
    case 'fetchSignIn':
      return {...state, isLoadingSignIn: true};

    case 'onSignedIn':
    case 'onSignedOut':
      return {...state, isLoadingSignIn: false};

    case 'requestJoinRoom':
      return {...state, isLoadingRoom: true};

    case 'onRoomLoaded':
    case 'onRoomError':
      return {...state, isLoadingRoom: false};

    default:
      return state;
  }
};

const wall = (state = [], action) => {
  switch(action.type) {
    case 'onUpdate':
      return values(action.payload);

    default:
      return state;
  }
};


const cameraModesState = {
  id0: { id: 'id0', sort: 2, interval: -1, label: 'off'},
  id1: { id: 'id1', sort: 0, interval: 120000, label: 'so so'},
  id2: { id: 'id2', sort: 1, interval: 300000, label: 'sometimes'}
};

const offlineTimeout = 900000;

const room = (state = { options: { cameraModes: values(cameraModesState), offlineTimeout } }, action) => {
  switch(action.type) {
    case 'onRoomOptions':
      return {...state, options: action.payload};

    case 'onRoomJoined':
      return {...state, id: action.payload};

    default:
      return state;
  }
};

const roomSelection = (state = 'novoda') => {
  return state;
};

const defaultCameraSelection = cameraModesState.id1;
const drawer = (state = {roomListing: [], open: false, options: { showOffline: true}, cameraModeSelection: defaultCameraSelection}, action) => {
  switch(action.type) {
      case 'drawerClose':
        return {...state, open: false};
      case 'drawerChange':
        return {...state, open: action.state};
      case 'drawerToggle':
        return {...state, open: !state.open};
      case 'drawerOfflineChange': {
        const newOptions = {...state.options, showOffline: !state.options.showOffline};
        return {...state, options: newOptions};
      }
      case 'onRoomListing':
        return {...state, roomListing: values(action.payload)};

      case 'onCameraModeSelected':
        return {...state, cameraModeSelection: action.payload};
      default:
        return state;
  }
};

const FIVE_MINTUES_MS = (5 * 60) * 1000;
const cameraMode = (state = {selection: { interval: FIVE_MINTUES_MS} }, action) => {
  switch(action.type) {
    case 'onCameraModeSelected':
      return {...state, selection: action.payload};
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
