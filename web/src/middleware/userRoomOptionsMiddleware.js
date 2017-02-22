const userRoomOptionsMiddleware = firebase => store => next => action => {
  const state = store.getState();
  switch (action.type) {
    case 'getUserOptions':
      getUserOptions(firebase)(state.user.uid)(state.room.id)(store.dispatch);
      break;

    case 'updateUserRoomOptions':
      updateUserRoomOptions(firebase)(state.user.uid)(state.room.id)(action.payload);
    break;

    default:
      return next(action);
  }
};

const getUserOptions = firebase => userId => roomId => dispatch => {
  const optionsPath = `wip/users/${userId}/rooms/${roomId}/options`;
  return firebase.database().ref(optionsPath).once('value', snapshot => {
    const result = snapshot.val();
    if (result) {
      dispatch({type: 'onUserRoomOptions', payload: result });
    }
  });
};

const updateUserRoomOptions = firebase => userId => roomId => options => {
  return firebase.database().ref(`wip/users/${userId}/rooms/${roomId}/options/`)
    .update(options);
};

export default userRoomOptionsMiddleware;
