import OnboardingView from './onboardingView';
import { mapToProps, mapToDispatch } from './onboardingContainer';
import { connect } from 'react-redux';

export default connect(
  mapToProps,
  mapToDispatch
)(OnboardingView);
