import { submitScreenshot } from '../../firebase';
import Console from '../../console';

export const mapToProps = state => {
  return {
    cameraIsActive: state.camera.active,
    requestAutomaticScreenshot: state.camera.requestAutomaticScreenshot,
    requestManualScreenshot: state.camera.requestManualScreenshot,
    user: state.user,
    roomId: state.room.id,
    cameraModeSelection: state.cameraMode.selection
  };
};

export const mapToDispatch = dispatch => {
  return {
    automaticScreenshot: () => {
      dispatch({type: 'automaticScreenshot'});
    },
    screenshot: (roomId, user, screenshot) => {
      dispatch({type: 'closeCamera'});
      if (screenshot !== 'data:,') {
        dispatch(submitScreenshot(roomId)(user)(screenshot));
      } else {
        Console.error('screenshot was invalid, skipping');
      }
    },
    closePreview: () => {
      dispatch({type: 'closePreview'});
    }
  };
};
