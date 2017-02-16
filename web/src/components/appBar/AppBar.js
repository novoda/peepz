import AppBarView from './appBarView';
import { mapToProps, mapToDispatch } from './appBarContainer';
import { connect } from 'react-redux';

export default connect(
  mapToProps,
  mapToDispatch
)(AppBarView);
