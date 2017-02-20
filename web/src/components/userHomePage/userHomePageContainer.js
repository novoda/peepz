import { roomListing } from '../../firebase';

export const mapToProps = state => {
  return {
    roomId: state.roomSelection,
  };
};

export const mapToDispatch = dispatch => {
  return {
    getRoomListings: () => {
      dispatch(roomListing());
    }
  };
};
