import { showPreview, closePreview, manualScreenshot } from '../../actions';

export const mapToProps = state => {
  return {
    cameraIsActive: state.camera.active
  };
};

export const mapToDispatch = dispatch => {
  return {
    onPreview: () => {
      dispatch(showPreview);
    },
    closePreview: () => {
      dispatch(closePreview);
    },
    startScreenshot: () => {
      dispatch(manualScreenshot);
    }
  };
};
