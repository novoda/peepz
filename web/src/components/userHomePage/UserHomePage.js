import UserHomePageView from './userHomePageView';
import { mapToProps, mapToDispatch } from './userHomePageContainer';
import { connect } from 'react-redux';

export default connect(
  mapToProps,
  mapToDispatch
)(UserHomePageView);
