import { joinRoom } from '../../actions';

export const mapToProps = state => {
  return {
      roomListing: state.drawer.roomListing,
      roomId: state.room.id,
      open: state.drawer.open,
      user: state.user,
      showOffline: state.drawer.options.showOffline,
      cameraModes: state.room.options.cameraModes,
      cameraModeSelectionId: state.drawer.options.cameraModeSelection
    };
};

export const mapToDispatch = dispatch => {
  return {
    onClose: listing => () => {
      dispatch({type: 'drawerClose' });
      dispatch(joinRoom(listing.id));
    },
    onRequestChange: open => {
      dispatch({type: 'drawerChange', state: open});
    },
    onToggled: (event, newState) => {
      dispatch({type: 'drawerOfflineChange', state: newState});
      dispatch({type: 'updateUserRoomOptions', payload: { showOffline: newState}});
    },
    onCameraModeSelected: () => cameraMode => {
      dispatch({type: 'onCameraModeSelected', payload: cameraMode});
      dispatch({type: 'updateUserRoomOptions', payload: { cameraModeSelection: cameraMode.id}});
    }
  };
};
