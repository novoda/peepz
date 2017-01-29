import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';

import pictureTakeIcon from '../../assets/ic_picturetake.png'

const styles = StyleSheet.create({
  pictureTakeIconStyle: {
    width: '36px',
    maxHeight: '100%'
  },
  pictureTakeButtonStyle: {
    position: 'absolute',
    cursor: 'pointer',
    border: 'none',
    bottom: '0',
    right: '0',
    zIndex: '1',
    background: 'transparent'
  },
  closeButtonStyle: {
    position: 'absolute',
    zIndex: '1'
  },
  buttonStyle: {
    cursor: 'pointer',
  }
});

const Controls = ({ onPreview, closePreview, startScreenshot, cameraIsActive}) => {
  if (cameraIsActive) {
    return (
      <div className={css(styles.closeButtonStyle)}>
        <button className={css(styles.buttonStyle)} onClick={closePreview}>❌</button>
        <button className={css(styles.buttonStyle)} onClick={startScreenshot}>📷</button>
      </div>
    );
  } else {
    return (
      <button className={css(styles.pictureTakeButtonStyle)} onClick={onPreview}>
        <img className={css(styles.pictureTakeIconStyle)} src={pictureTakeIcon} />
      </button>
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
