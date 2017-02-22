const joinRoomMiddleware = firebase => store => next => action => {
  const state = store.getState();
  switch (action.type) {
    case 'joinRoom':
      joinRoom(firebase)(action.payload)(state.user)(store.dispatch);
      break;
    default:
      return next(action);
  }
};

const joinRoom = firebase => roomId => user => dispatch => {
  const wallPath = `wip/rooms/${roomId}/wall`;
  const dispatchAction = dispatcher(dispatch);
  dispatch({type: 'requestJoinRoom'});
  firebase.database()
    .ref(wallPath)
    .once('value')
    .then(hasUser(user))
    .then(userExists => {
      return userExists ? {} : updateUser(firebase)(wallPath)(user);
    })
    .then(dispatchAction({type: 'onRoomJoined', payload: roomId}))
    .then(dispatchAction({type: 'getWall'}))
    .then(dispatchAction({type: 'getRoomOptions'}))
    .then(dispatchAction({type: 'getUserOptions'}))
    .then(dispatchAction({type: 'onRoomLoaded'}))
    .catch(() => {
      return dispatchAction({type: 'onRoomError'});
    });
};

const hasUser = user => snapshot => {
  return snapshot.child(user.uid).exists();
};

const updateUser = firebase => wallPath => user => {
  return firebase.database().ref(`${wallPath}/${user.uid}`).set({
    uid: user.uid,
    name: user.displayName
  });
};

const dispatcher = dispatch => action => {
  return dispatch(action);
};

export default joinRoomMiddleware;
