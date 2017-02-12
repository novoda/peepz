import * as fb from 'firebase';

const wallPath = roomId => {
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

const hasUser = user => snapshot => {
  return snapshot.child(user.uid).exists();
};

const dispatchSignedIn = dispatch => user => () => {
  dispatch({type: 'onSignedIn', payload: user});
};

const submitScreenshot = roomId => user => screenshot => () => {
  return fb.storage()
    .ref()
    .child(`${wallPath(roomId)}/${user.uid}/${user.uid}.webp`)
    .putString(screenshot, 'data_url')
    .then(result => {
      return fb.database().ref(`${wallPath(roomId)}/${user.uid}/image`).set({
        payload: result.downloadURL,
        timestamp: Date.now()
      });
    });
};

const getAllScreenshots = roomId => dispatch => {
  fb.database().ref(wallPath(roomId)).on('value', snapshot => {
    const result = snapshot.val() || {};
    dispatch({type: 'onUpdate', payload: result });
  });
};

const lastSeen = roomId => userId => () => {
  fb.database().ref(`${wallPath(roomId)}/${userId}`).update({
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
  fb.database()
    .ref(wallPath(roomId))
    .once('value')
    .then(hasUser(user))
    .then(userExists => {
      if (userExists) {
        dispatchJoinedRoom(dispatch)(roomId)();
      } else {
        return fb.database().ref(`${wallPath}/${user.uid}`).set({
          uid: user.uid,
          name: user.displayName
        }).then(dispatchJoinedRoom(dispatch)(roomId));
      }
    });
};

const dispatchJoinedRoom = dispatch => roomId => () => {
  dispatch({type: 'onJoinedRoom', payload: roomId});
};

export {
  fetchSignIn,
  requestSignIn,
  submitScreenshot,
  getAllScreenshots,
  lastSeen,
  logout,
  roomListing,
  joinRoom
};
