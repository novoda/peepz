export const mapToProps = () => {
  return {};
};

export const mapToDispatch = dispatch => {
  return {
    toggleDrawer: () => {
      dispatch({type: 'drawerToggle'});
    }
  };
};
