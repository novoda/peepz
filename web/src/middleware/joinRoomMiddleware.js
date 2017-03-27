import { TYPES, requestJoinRoom, onRoomJoined, onRoomError, getWall, getRoomOptions, getUserOptions, onRoomLoaded } from '../actions';

const joinRoomMiddleware = firebase => store => next => action => {
  const state = store.getState();
  switch (action.type) {
    case TYPES.JOIN_ROOM:
      joinRoom(firebase)(action.payload)(state.user)(store.dispatch);
      break;
    default:
      return next(action);
  }
};

const joinRoom = firebase => roomId => user => dispatch => {
  const wallPath = `wip/rooms/${roomId}/wall`;
  const dispatchAction = dispatcher(dispatch);
  dispatch(requestJoinRoom);
  firebase.database()
    .ref(wallPath)
    .once('value')
    .then(hasUser(user))
    .then(userExists => {
      return userExists ? {} : updateUser(firebase)(user);
    })
    .then(dispatchAction(onRoomJoined(roomId)))
    .then(dispatchAction(getWall))
    .then(dispatchAction(getRoomOptions))
    .then(dispatchAction(getUserOptions))
    .then(dispatchAction(onRoomLoaded))
    .catch(dispatchAction(onRoomError));
};

const hasUser = user => snapshot => {
  return snapshot.child(user.uid).exists();
};

const updateUser = firebase => user => {
  return firebase.database().ref('/wip/events/').push({
    type: 'JOIN',
    payload: {
      uid: user.uid,
      name: user.displayName
    }
  });
};

const dispatcher = dispatch => action => () => {
  return dispatch(action);
};

export default joinRoomMiddleware;
