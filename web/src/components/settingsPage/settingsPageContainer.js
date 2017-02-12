import { fetchSignIn as fetch} from '../../firebase';

export const mapToProps = state => {
  return {
      isSignedIn: state.isSignedIn,
      isLoadingSignIn: state.loading.isLoadingSignIn
  };
};

export const mapToDispatch = dispatch => {
  return {
    fetchSignIn: () => {
      dispatch(fetch());
    }
  };
};
