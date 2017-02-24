const TYPES = {
  DRAWER_CLOSE: 'drawerClose',
  DRAWER_CHANGE: 'drawerChange',
  DRAWER_TOGGLE: 'drawerToggle',
  DRAWER_OFFLINE_CHANGE: 'drawerOfflineChange',
  ON_CAMERA_MODE_SELECTED: 'onCameraModeSelected',
  FETCH_SIGN_IN: 'fetchSignIn',
  REQUEST_SIGN_IN: 'requestSignIn',
  LAST_SEEN: 'lastSeen',
  LOGOUT: 'logout',
  ROOM_LISTING: 'roomListing',
  JOIN_ROOM: 'joinRoom',
  UPDATE_USER_ROOM_OPTIONS: 'updateUserRoomOptions',
  SUBMIT_SCREENSHOT: 'submitScreenshot',
  GET_ROOM_OPTIONS: 'getRoomOptions',
  GET_USER_OPTIONS: 'getUserOptions',
  GET_WALL: 'getWall',
  CLOSE_CAMERA: 'closeCamera',
  CLOSE_PREVIEW: 'closePreview',
  AUTOMATIC_SCREENSHOT: 'automaticScreenshot',
  MANUAL_SCREENSHOT: 'manualScreenshot',
  SHOW_PREVIEW: 'showPreview',
  ON_USER_ROOM_OPTIONS: 'onUserRoomOptions',
  ON_ROOM_OPTIONS: 'onRoomOptions',
  ON_ROOM_JOINED: 'onRoomJoined',
  ON_SIGNED_IN: 'onSignedIn',
  ON_SIGNED_OUT: 'onSignedOut',
  ON_ROOM_LOADED: 'onRoomLoaded',
  ON_ROOM_ERROR: 'onRoomError',
  REQUEST_JOIN_ROOM: 'requestJoinRoom',
};

const getUserOptions = {
  type: TYPES.GET_USER_OPTIONS
};

const getWall = {
  type: TYPES.GET_WALL
};

const getRoomOptions = {
  type: TYPES.GET_ROOM_OPTIONS
};

const onRoomError = {
  type: TYPES.ON_ROOM_ERROR
};

const requestJoinRoom = {
  type: TYPES.REQUEST_JOIN_ROOM
};

const onRoomLoaded = {
  type: TYPES.ON_ROOM_LOADED
};

const onRoomJoined = roomId => {
  return {
    type: TYPES.ON_ROOM_JOINED,
    payload: roomId
  };
};

const manualScreenshot = {
  type: TYPES.MANUAL_SCREENSHOT
};

const showPreview = {
  type: TYPES.SHOW_PREVIEW
};

const onCameraModeSelected = selectedCameraMode => {
  return {
    type: TYPES.ON_CAMERA_MODE_SELECTED,
    payload: selectedCameraMode
  };
};

const drawerOfflineChange = newState => {
  return {
    type: TYPES.DRAWER_OFFLINE_CHANGE,
    state: newState
  };
};

const drawerToggle = {
  type: TYPES.DRAWER_TOGGLE
};

const drawerChange = state => {
  return {
    type: TYPES.DRAWER_CHANGE,
    state: state
  };
};

const drawerClose ={
  type: TYPES.DRAWER_CLOSE
};

const automaticScreenshot = {
  type: TYPES.AUTOMATIC_SCREENSHOT
};

const closeCamera = {
  type: TYPES.CLOSE_CAMERA
};

const closePreview = {
  type: TYPES.CLOSE_PREVIEW
};

const onSignedIn = user => {
  return {
    type: TYPES.ON_SIGNED_IN,
    payload: user
  };
};

const onSignedOut = {
  type: TYPES.ON_SIGNED_OUT
};

const onUserRoomOptions = userRoomOptions => {
  return {
    type: TYPES.ON_USER_ROOM_OPTIONS,
    payload: userRoomOptions
  };
};

const onRoomOptions = roomOptions => {
  return {
    type: TYPES.ON_ROOM_OPTIONS,
    payload: roomOptions
  };
};

const fetchSignIn = {
  type: TYPES.FETCH_SIGN_IN
};

const requestSignIn = {
  type: TYPES.REQUEST_SIGN_IN
};

const lastSeen = {
  type: TYPES.LAST_SEEN
};

const logout = {
  type: TYPES.LOGOUT
};

const roomListing = {
  type: TYPES.ROOM_LISTING
};

const joinRoom = roomId => {
  return {
    type: TYPES.JOIN_ROOM,
    payload: roomId
  };
};

const updateUserRoomOptions = options => {
  return {
    type: TYPES.UPDATE_USER_ROOM_OPTIONS,
    payload: options
  };
};

const submitScreenshot = picture => {
  return {
    type: TYPES.SUBMIT_SCREENSHOT,
    payload: picture
  };
};

export {
  fetchSignIn,
  requestSignIn,
  submitScreenshot,
  lastSeen,
  logout,
  roomListing,
  joinRoom,
  updateUserRoomOptions,
  onUserRoomOptions,
  onRoomOptions,
  onSignedIn,
  onSignedOut,
  showPreview,
  closePreview,
  closeCamera,
  manualScreenshot,
  automaticScreenshot,
  drawerClose,
  drawerChange,
  drawerToggle,
  drawerOfflineChange,
  onCameraModeSelected,
  onRoomLoaded,
  onRoomJoined,
  onRoomError,
  requestJoinRoom,
  getRoomOptions,
  getUserOptions,
  getWall,
  TYPES
};
