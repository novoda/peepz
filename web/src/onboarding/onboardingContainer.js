import { joinRoom as actionJoinRoom } from '../actions';


export const mapToProps = state => {
  return {};
};

export const mapToDispatch = dispatch => {
  return {
    joinRoom: roomId => {
      dispatch(actionJoinRoom(roomId));
    }
  };
};
