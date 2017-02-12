import React from 'react';
import { css } from 'aphrodite/no-important';
import Style from './controls.style';

export default ({ onPreview, closePreview, startScreenshot, cameraIsActive}) => {
  if (cameraIsActive) {
    return (
      <div className={css(Style.closeButtonStyle)}>
        <button className={css(Style.buttonStyle)} onClick={closePreview}>❌</button>
        <button className={css(Style.buttonStyle)} onClick={startScreenshot}>📷</button>
      </div>
    );
  } else {
    return (
      <button className={css(Style.pictureTakeButtonStyle)} onClick={onPreview}>
        <img className={css(Style.pictureTakeIconStyle)} />
      </button>
    );
  }
};
