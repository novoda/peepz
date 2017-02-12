import { lastSeen, joinRoom } from '../../firebase';

export const mapToProps = state => {
  return {
    user: state.user,
    isLoadingRoom: state.loading.isLoadingRoom
  };
};

export const mapToDispatch = dispatch => {
  return {
    updateLastSeen: (roomId, user) => {
      dispatch(lastSeen(roomId)(user.uid));
    },
    joinRoom: (roomId, user) => {
      dispatch(joinRoom(roomId)(user));
    }
  };
};
