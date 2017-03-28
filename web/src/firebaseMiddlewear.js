const firebaseMiddleware = firebase => store => next => action => {
  const state = store.getState();
  switch (action.type) {
    case 'roomListing':
      roomListing(firebase)(state.user.uid)(store.dispatch);
      break;

    case 'adminListing':
      adminListing(firebase)(state.drawer.roomListing)(store.dispatch);
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

const adminListing = firebase => roomListing => dispatch => {
  Promise.all(roomListing.map(room => {
    return firebase.database().ref(`wip/rooms/${room.id}/members`).once('value')
    .then(result => {
      return Promise.resolve({...result.val(), id: room.id});
    }).catch(() => {
      return Promise.resolve(false);
    });
  })).then(result => {
    const adminRooms = result.filter(each => each);
    console.log('result:', adminRooms);
    if (adminRooms.length > 0) {
      dispatch({type: 'onAdminListing', payload: adminRooms});
    }
  });
};


export default firebaseMiddleware;
