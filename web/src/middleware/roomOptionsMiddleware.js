let currentOptionsRef;

const roomOptionsMiddleware = firebase => store => next => action => {
  const state = store.getState();
  switch (action.type) {
    case 'getRoomOptions':
      if (currentOptionsRef) {
        currentOptionsRef.off();
      }
      getRoomOptions(firebase)(state.room.id)(store.dispatch);
      break;

    default:
      return next(action);
  }
};

const getRoomOptions = firebase => roomId => dispatch => {
  const optionsPath = `wip/rooms/${roomId}/options`;
  const currentOptionsRef = firebase.database().ref(optionsPath);
  currentOptionsRef.on('value', snapshot => {
    const result = snapshot.val() || {};
    dispatch({type: 'onRoomOptions', payload: result });
  });
};

export default roomOptionsMiddleware;
