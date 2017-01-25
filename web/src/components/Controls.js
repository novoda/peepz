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

const Controls = ({onPreview, closePreview, startScreenshot, isPreviewing}) => {
  return null;
  if (isPreviewing) {
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
    isPreviewing: state.camera.isPreviewing
  };
}, (dispatch => {
  return {
    onPreview: () => {
      dispatch({type: 'onPreview'});
    },
    closePreview: () => {
      dispatch({type: 'onclosePreview'});
    },
    startScreenshot: (screenshot) => {
      dispatch({type: 'requestScreenshot'});
    }
  }
}))(Controls);

export {
  ControlsContainer
};
