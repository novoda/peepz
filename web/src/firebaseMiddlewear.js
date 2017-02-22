const firebaseMiddleware = firebase => store => next => action => {
  const state = store.getState();
  const continueToNext = () => {
    return next(action);
  };
  switch (action.type) {
    case 'submitScreenshot':
      submitScreenshot(firebase)(state.room.id)(state.user)(action.payload)
        .then(continueToNext);
      break;
    default:
      return next(action);
  }
};

const submitScreenshot = firebase => roomId => user => screenshot => {
  const wallPath = createWallPath(roomId);
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

const createWallPath = roomId => {
  return `wip/rooms/${roomId}/wall`;
};

export default firebaseMiddleware;
