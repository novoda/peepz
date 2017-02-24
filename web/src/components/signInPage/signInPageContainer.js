import { requestSignIn as signIn} from '../../actions';

export const mapToProps = () => {
  return {};
};

export const mapToDispatch = dispatch => {
  return {
    requestSignIn: () => {
      dispatch(signIn);
    }
  };
};
