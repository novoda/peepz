import { connect } from 'react-redux';
import MeView from './meView';
import { mapToProps, mapToDispatch } from './meContainer';

export default connect(
  mapToProps,
  mapToDispatch
)(MeView);
