import { submitScreenshot, automaticScreenshot, closeCamera, closePreview } from '../../actions'
import Console from '../../console'

export const mapToProps = state => {
  return {
    cameraIsActive: state.camera.active,
    requestAutomaticScreenshot: state.camera.requestAutomaticScreenshot,
    requestManualScreenshot: state.camera.requestManualScreenshot,
    user: state.user,
    roomId: state.room.id,
    cameraModeSelectionId: state.cameraMode.selectionId,
    cameraModes: state.room.options.cameraModes
  }
}

export const mapToDispatch = dispatch => {
  return {
    automaticScreenshot: () => {
      dispatch(automaticScreenshot)
    },
    screenshot: (roomId, user, screenshot) => {
      dispatch(closeCamera)
      if (screenshot !== 'data:,') {
        dispatch(submitScreenshot(screenshot))
      } else {
        Console.error('screenshot was invalid, skipping')
      }
    },
    closePreview: () => {
      dispatch(closePreview)
    }
  }
}
