import React from 'react';
import { connect } from 'react-redux';

const screenshotButtonStyle = {
  position: 'absolute',
  cursor: 'pointer',
}

const closeButtonStyle = {
  position: 'absolute',
  zIndex: '1'
}

const buttonStyle = {
  cursor: 'pointer',
};

const Controls = ({onPreview, closePreview, startScreenshot, cameraIsActive}) => {
  if (cameraIsActive) {
    return (
      <div style={closeButtonStyle}>
        <button style={buttonStyle} onClick={closePreview}>❌</button>
        <button style={buttonStyle} onClick={startScreenshot}>📷</button>
      </div>
    );
  } else {
    return (
      <button style={screenshotButtonStyle} onClick={onPreview}>📷</button>
    );
  }
}

const ControlsContainer = connect(state => {
  return {
    cameraIsActive: state.camera.active
  };
}, (dispatch => {
  return {
    onPreview: () => {
      dispatch({type: 'showPreview'});
    },
    closePreview: () => {
      dispatch({type: 'closePreview'});
    },
    startScreenshot: (screenshot) => {
      dispatch({type: 'manualScreenshot'});
    }
  }
}))(Controls);

export {
  ControlsContainer
};
