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

const joinRoom = roomId => user => dispatch => {
  const wallPath = createWallPath(roomId);
  dispatch({type: 'requestJoinRoom'});
  fb.database()
    .ref(wallPath)
    .once('value')
    .then(hasUser(user))
    .then(userExists => {
      return userExists ? {} : updateUser(wallPath, user);
    })
    .then(() => {
      return dispatch({type: 'onRoomJoined', payload: roomId});
    })
    .then(() => {
      return dispatch({type: 'getWall'});
    })
    .then(() => {
      return dispatch({type: 'getRoomOptions'});
    })
    .then(getUserOptions(`wip/users/${user.uid}/rooms/${roomId}/options`)(dispatch))
    .then(() => {
      return dispatch({type: 'onRoomLoaded'});
    }).catch(() => {
      return dispatch({type: 'onRoomError'});
    });
};

const hasUser = user => snapshot => {
  return snapshot.child(user.uid).exists();
};

const updateUser = (wallPath, user) => {
  return fb.database().ref(`${wallPath}/${user.uid}`).set({
    uid: user.uid,
    name: user.displayName
  });
};

const getUserOptions = optionsPath => dispatch => () => {
  return fb.database().ref(optionsPath).once('value', snapshot => {
    const result = snapshot.val();
    if (result) {
      dispatch({type: 'onUserRoomOptions', payload: result });
    }
  });
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
