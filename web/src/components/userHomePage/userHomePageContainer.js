import {
  lastSeen,
  joinRoom,
  logout } from '../../firebase';

export const mapToProps = state => {
  return {
    user: state.user,
    roomId: state.roomSelection
  };
};

export const mapToDispatch = dispatch => {
  return {
    updateLastSeen: (roomId, user) => {
      dispatch(lastSeen(roomId)(user.uid));
    },
    onLogoutClicked: () => {
      dispatch(logout());
    },
    joinRoom: (roomId, user) => {
      dispatch(joinRoom(roomId)(user));
    }
  };
};
