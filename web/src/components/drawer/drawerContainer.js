import { joinRoom } from '../../firebase';

export const mapToProps = state => {
  return {
      roomListing: state.drawer.roomListing,
      open: state.drawer.open,
      user: state.user,
      options: state.drawer.options
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
    }
  };
};
