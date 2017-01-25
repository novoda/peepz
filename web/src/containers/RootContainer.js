import Root from '../components/Root';
import { connect } from 'react-redux';
import { fetchSignIn as fetch} from '../firebase';

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.isSignedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSignIn: () => {
      dispatch(fetch());
    }
  };
};

const RootContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);

export default RootContainer;
