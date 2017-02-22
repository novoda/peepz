let currentWallRef;
const firebaseMiddleware = firebase => store => next => action => {
  const state = store.getState();
  const continueToNext = () => {
    return next(action);
  };
  switch (action.type) {
    case 'getWall':
      if (currentWallRef) {
        currentWallRef.off();
      }
      currentWallRef = getWall(firebase)(state.room.id)(store.dispatch);
      break;

    case 'submitScreenshot':
      submitScreenshot(firebase)(state.room.id)(state.user)(action.payload)
        .then(continueToNext);
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

const submitScreenshot = firebase => roomId => user => screenshot => {
  const wallPath = `wip/rooms/${roomId}/wall`;
  return firebase.storage()
    .ref()
    .child(`${wallPath}/${user.uid}/${user.uid}.webp`)
    .putString(screenshot, 'data_url')
    .then(result => {
      return firebase.database().ref(`${wallPath}/${user.uid}/image`).set({
        payload: result.downloadURL,
        timestamp: Date.now()
      });
    });
};

export default firebaseMiddleware;
