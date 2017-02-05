import { connect } from 'react-redux';
import WallView from './wallView';
import { mapToProps } from './wallContainer';

export default connect(mapToProps)(WallView);
