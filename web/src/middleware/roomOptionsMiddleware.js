import { TYPES, onRoomOptions } from '../actions';

let currentOptionsRef;

const roomOptionsMiddleware = firebase => store => next => action => {
  const state = store.getState();
  switch (action.type) {
    case TYPES.GET_ROOM_OPTIONS:
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
    dispatch(onRoomOptions(result));
  });
};

export default roomOptionsMiddleware;
