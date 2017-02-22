import { requestSignIn as signIn} from '../../firebase';

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
