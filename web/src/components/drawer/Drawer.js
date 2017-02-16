import DrawerView from './drawerView';
import { mapToProps, mapToDispatch } from './drawerContainer';
import { connect } from 'react-redux';

export default connect(
  mapToProps,
  mapToDispatch
)(DrawerView);
