import {
  lastSeen,
  getAllScreenshots as fetchAllScreenshots,
  logout } from '../../firebase';

export const mapToProps = state => {
  return {
    user: state.user
  };
};

export const mapToDispatch = dispatch => {
  return {
    getAllScreenshots: () => {
      dispatch(fetchAllScreenshots());
    },
    updateLastSeen: (user) => {
      dispatch(lastSeen(user.uid));
    },
    onLogoutClicked: () => {
      dispatch(logout());
    }
  };
};
