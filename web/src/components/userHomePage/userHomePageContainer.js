import { logout } from '../../firebase';

export const mapToProps = state => {
  return {
    roomId: state.roomSelection,
  };
};

export const mapToDispatch = dispatch => {
  return {
    onLogoutClicked: () => {
      dispatch(logout());
    }
  };
};
