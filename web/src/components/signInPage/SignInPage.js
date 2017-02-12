import SignInPageView from './signInPageView';
import { mapToProps, mapToDispatch } from './signInPageContainer';
import { connect } from 'react-redux';

export default connect(
  mapToProps,
  mapToDispatch
)(SignInPageView);
