let currentWallRef;
const firebaseMiddleware = firebase => store => next => action => {
  const state = store.getState();
  switch (action.type) {
    case 'getWall':
      if (currentWallRef) {
        currentWallRef.off();
      }
      currentWallRef = getWall(firebase)(state.room.id)(store.dispatch);
      break;
    default:
      return next(action);
  }
};

const getWall = firebase => roomId => dispatch => {
  const wallPath = `wip/rooms/${roomId}/wall`;
  const currentWallRef = firebase.database().ref(wallPath);
  currentWallRef.on('value', snapshot => {
    const result = snapshot.val() || {};
    dispatch({type: 'onUpdate', payload: result });
  });
  return currentWallRef;
};

export default firebaseMiddleware;
