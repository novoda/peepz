import * as fb from 'firebase';

const createWallPath = roomId => {
  return `wip/rooms/${roomId}/wall`;
};

const fetchSignIn = {
  type: 'fetchSignIn'
};

const requestSignIn = () => dispatch => {
  const provider = new fb.auth.GoogleAuthProvider();
  fb.auth().signInWithPopup(provider).then(result => {
    const user = result.user;
    dispatchSignedIn(dispatch)(user)();
  });
};

const dispatchSignedIn = dispatch => user => () => {
  dispatch({type: 'onSignedIn', payload: user});
};

const lastSeen = roomId => userId => () => {
  fb.database().ref(`${createWallPath(roomId)}/${userId}`).update({
    lastSeen: Date.now()
  });
};

const logout = () => dispatch => {
  return fb.auth().signOut().then(() => {
    dispatch({type: 'onSignedOut'});
  });
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
    .then(getRoomOptions(`wip/rooms/${roomId}/options`)(dispatch))
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

let currentOptionsRef;
const getRoomOptions = optionsPath => dispatch => () => {
  if (currentOptionsRef) {
    currentOptionsRef.off();
  }
  currentOptionsRef = fb.database().ref(optionsPath);
  currentOptionsRef.on('value', snapshot => {
    const result = snapshot.val() || {};
    dispatch({type: 'onRoomOptions', payload: result });
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
