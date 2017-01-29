import * as fb from 'firebase';

const fetchSignIn = () => dispatch => {
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
    fb.database()
      .ref('wall')
      .once('value')
      .then(hasUser(user))
      .then(userExists => {
        if (userExists) {
          dispatchSignedIn(dispatch)(user)();
        } else {
          return fb.database().ref(`wall/${user.uid}`).set({
            uid: user.uid,
            name: user.displayName,
          }).then(dispatchSignedIn(dispatch)(user));
        }
      });
  });
};

const hasUser = user => snapshot => {
  return snapshot.child(user.uid).exists();
};

const dispatchSignedIn = dispatch => user => () => {
  dispatch({type: 'onSignedIn', payload: user});
};

const submitScreenshot = user => screenshot => () => {
  return fb.storage()
    .ref()
    .child(`wall/${user.uid}.png`)
    .putString(screenshot, 'data_url')
    .then(result => {
      return fb.database().ref(`wall/${user.uid}/image`).set({
        payload: result.downloadURL,
        timestamp: Date.now()
      });
    });
};

const getAllScreenshots = () => dispatch => {
  fb.database().ref('wall/').on('value', snapshot => {
    const result = snapshot.val() || {};
    dispatch({type: 'onUpdate', payload: result });
  });
};

const lastSeen = userId => () => {
  fb.database().ref(`wall/${userId}`).update({
    lastSeen: Date.now()
  });
};

const logout = () => dispatch => {
  return fb.auth().signOut().then(() => {
    dispatch({type: 'onSignedOut'});
  });
};

export {
  fetchSignIn,
  requestSignIn,
  submitScreenshot,
  getAllScreenshots,
  lastSeen,
  logout
};
