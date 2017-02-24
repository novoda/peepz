import { fetchSignIn as fetch, logout} from '../../actions';
import { browserHistory } from 'react-router';

export const mapToProps = state => {
  return {
      isSignedIn: state.isSignedIn,
      isLoadingSignIn: state.loading.isLoadingSignIn,
      user: state.user
  };
};

export const mapToDispatch = dispatch => {
  return {
    fetchSignIn: () => {
      dispatch(fetch);
    },
    onLogoutClicked: () => {
      dispatch(logout);
      browserHistory.push('/');
    }
  };
};
