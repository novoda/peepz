import * as fb from 'firebase';

const createWallPath = roomId => {
  return `wip/rooms/${roomId}/wall`;
};

const fetchSignIn = () => dispatch => {
  dispatch({type: 'fetchSignIn'});
  const unsubscribe = fb.auth().onAuthStateChanged(result => {
    unsubscribe();
    if (result) {
      dispatch({type: 'onSignedIn', payload: result});
    } else {
      dispatch({type: 'onSignedOut'});
    }
  });
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

const submitScreenshot = roomId => user => screenshot => () => {
  const wallPath = createWallPath(roomId);
  return fb.storage()
    .ref()
    .child(`${wallPath}/${user.uid}/${user.uid}.webp`)
    .putString(screenshot, 'data_url')
    .then(result => {
      return fb.database().ref(`${wallPath}/${user.uid}/image`).set({
        payload: result.downloadURL,
        timestamp: Date.now()
      });
    });
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

const roomListing = () => dispatch => {
  fb.database().ref('wip/listing').on('value', snapshot => {
    const listings = snapshot.val();
    dispatch({type: 'onRoomListing', listings});
  });
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
    .then(getWall(wallPath)(dispatch))
    .then(() => {
      return dispatch({type: 'onRoomLoaded'});
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

const getWall = wallPath => dispatch => () => {
  fb.database().ref(wallPath).on('value', snapshot => {
    const result = snapshot.val() || {};
    dispatch({type: 'onUpdate', payload: result });
  });
};

export {
  fetchSignIn,
  requestSignIn,
  submitScreenshot,
  lastSeen,
  logout,
  roomListing,
  joinRoom
};
