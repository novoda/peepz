import { TYPES, onSignedIn, onSignedOut } from '../actions';

const authMiddleware = firebase => store => next => action => {
  switch (action.type) {
    case TYPES.FETCH_SIGN_IN:
      fetchSignIn(firebase)(store.dispatch);
      break;

    case TYPES.REQUEST_SIGN_IN:
      requestSignIn(firebase)();
      break;

    case TYPES.LOGOUT:
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
      dispatch(onSignedIn(result));
    } else {
      dispatch(onSignedOut);
    }
  });
};

const requestSignIn = firebase => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

const logout = firebase => dispatch => {
  return firebase.auth().signOut().then(() => {
    dispatch(onSignedOut);
  });
};

export default authMiddleware;
