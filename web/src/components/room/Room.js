import RoomView from './RoomView';
import { mapToProps, mapToDispatch } from './roomContainer';
import { connect } from 'react-redux';

export default connect(
  mapToProps,
  mapToDispatch
)(RoomView);
