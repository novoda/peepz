const firebaseMiddleware = firebase => store => next => action => {
  const state = store.getState();
  switch (action.type) {
    case 'roomListing':
      roomListing(firebase)(state.user.uid)(store.dispatch);
      break;

    default:
      return next(action);
  }
};

const roomListing = firebase => userId => dispatch => {
  firebase.database().ref(`wip/users/${userId}/rooms`).on('value', snapshot => {
    const listings = snapshot.val();
    if (listings) {
      dispatch({type: 'onRoomListing', payload: listings});
    } else {
      dispatch({type: 'onUserHasNoRooms'});
    }
  });
};

export default firebaseMiddleware;
