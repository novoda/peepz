import { roomListing } from '../../firebase';

export const mapToProps = state => {
  return {
    roomId: state.roomSelection,
    userId: state.user.uid
  };
};

export const mapToDispatch = dispatch => {
  return {
    getRoomListings: userId => {
      dispatch(roomListing(userId));
    }
  };
};
