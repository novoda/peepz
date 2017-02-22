import * as fb from 'firebase';

const createWallPath = roomId => {
  return `wip/rooms/${roomId}/wall`;
};

const fetchSignIn = {
  type: 'fetchSignIn'
};

const requestSignIn = {
  type: 'requestSignIn'
};

const lastSeen = roomId => userId => () => {
  fb.database().ref(`${createWallPath(roomId)}/${userId}`).update({
    lastSeen: Date.now()
  });
};

const logout = {
  type: 'logout'
};

const roomListing = {
  type: 'roomListing'
};

const joinRoom = roomId => {
  return {
    type: 'joinRoom',
    payload: roomId
  };
};

const updateUserRoomOptions = (userId, roomId, cameraMode) => dispatch => {
  dispatch({type: 'onCameraModeSelected', payload: cameraMode});
  return fb.database().ref(`wip/users/${userId}/rooms/${roomId}/options/cameraModeSelection`)
    .set(cameraMode.id);
};

const submitScreenshot = picture => {
  return {
    type: 'submitScreenshot',
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
  updateUserRoomOptions
};
