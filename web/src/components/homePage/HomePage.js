import homePageView from './homePageView';
import { mapToProps, mapToDispatch } from './homePageContainer';
import { connect } from 'react-redux';

export default connect(
  mapToProps,
  mapToDispatch
)(homePageView);
