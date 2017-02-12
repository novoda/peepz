import ControlsView from './controlsView';
import { mapToProps, mapToDispatch } from './controlsContainer';
import { connect } from 'react-redux';

export default connect(
  mapToProps,
  mapToDispatch
)(ControlsView);
