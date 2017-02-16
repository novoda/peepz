export const mapToProps = state => {
  return {
      roomListing: state.drawer.roomListing,
      open: state.drawer.open
  };
};

export const mapToDispatch = dispatch => {
  return {
    onClose: () => {
      dispatch({type: 'drawerClose' });
    },
    onRequestChange: open => {
      dispatch({type: 'drawerChange', state: open});
    }
  };
};
