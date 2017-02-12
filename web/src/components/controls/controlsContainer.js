export const mapToProps = state => {
  return {
    cameraIsActive: state.camera.active
  };
};

export const mapToDispatch = dispatch => {
  return {
    onPreview: () => {
      dispatch({type: 'showPreview'});
    },
    closePreview: () => {
      dispatch({type: 'closePreview'});
    },
    startScreenshot: () => {
      dispatch({type: 'manualScreenshot'});
    }
  };
};
