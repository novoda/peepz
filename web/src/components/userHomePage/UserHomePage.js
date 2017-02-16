import UserHomePageView from './userHomePageView';
import { mapToProps } from './userHomePageContainer';
import { connect } from 'react-redux';

export default connect(
  mapToProps
)(UserHomePageView);
