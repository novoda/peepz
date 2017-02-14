import SettingsPageView from './settingsPageView';
import { mapToProps, mapToDispatch } from './settingsPageContainer';
import { connect } from 'react-redux';

export default connect(
  mapToProps,
  mapToDispatch
)(SettingsPageView);
