const authMiddleware = firebase => store => next => action => {
  switch (action.type) {
    case 'fetchSignIn':
      fetchSignIn(firebase)(store.dispatch);
      break;

    case 'requestSignIn':
      requestSignIn(firebase)(store.dispatch);
      break;

    case 'logout':
      logout(firebase)(store.dispatch);
      break;

    default:
      return next(action);
  }
};

const fetchSignIn = firebase => dispatch => {
  const unsubscribe = firebase.auth().onAuthStateChanged(result => {
    unsubscribe();
    if (result) {
      dispatch({type: 'onSignedIn', payload: result});
    } else {
      dispatch({type: 'onSignedOut'});
    }
  });
};

const requestSignIn = firebase => dispatch => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(result => {
    const user = result.user;
    dispatch({type: 'onSignedIn', payload: user});
  });
};

const logout = firebase => dispatch => {
  return firebase.auth().signOut().then(() => {
    dispatch({type: 'onSignedOut'});
  });
};

export default authMiddleware;
