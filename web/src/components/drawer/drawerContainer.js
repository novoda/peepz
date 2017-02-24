import { joinRoom, drawerClose, drawerChange, updateUserRoomOptions, drawerOfflineChange, onCameraModeSelected} from '../../actions';

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
      dispatch(drawerClose);
      dispatch(joinRoom(listing.id));
    },
    onRequestChange: state => {
      dispatch(drawerChange(state));
    },
    onToggled: (event, newState) => {
      dispatch(drawerOfflineChange(newState));
      dispatch(updateUserRoomOptions({showOffline: newState}));
    },
    onCameraModeSelected: () => cameraMode => {
      dispatch(onCameraModeSelected(cameraMode));
      dispatch(updateUserRoomOptions({ cameraModeSelection: cameraMode.id}));
    }
  };
};
