import { joinRoom, updateUserRoomOptions } from '../../firebase';

export const mapToProps = state => {
  return {
      roomListing: state.drawer.roomListing,
      roomId: state.room.id,
      open: state.drawer.open,
      user: state.user,
      options: state.drawer.options,
      cameraModes: state.room.options.cameraModes,
      cameraModeSelectionId: state.drawer.cameraModeSelectionId
    };
};

export const mapToDispatch = dispatch => {
  return {
    onClose: user => listing => () => {
      dispatch({type: 'drawerClose' });
      dispatch(joinRoom(listing.id)(user));
    },
    onRequestChange: open => {
      dispatch({type: 'drawerChange', state: open});
    },
    onToggled: (event, newState) => {
      dispatch({type: 'drawerOfflineChange', state: newState});
    },
    onCameraModeSelected: (userId, roomId) => cameraMode => {
      dispatch(updateUserRoomOptions(userId, roomId, cameraMode));
    }
  };
};
