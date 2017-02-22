const initialState = {
  requestScreenshot: false,
  isPreviewing: false ,
  manualScreenshot: false
};

const camera = (state = initialState, action) => {
  switch (action.type) {
    case 'showPreview':
      return {...state, active: true};

    case 'closePreview':
      return {...state, active: false};

    case 'automaticScreenshot':
      return {...state, active: true, requestAutomaticScreenshot: true};

    case 'manualScreenshot':
      return {...state, requestManualScreenshot: true};

    case 'closeCamera':
      return { active: false, requestManualScreenshot: false , requestAutomaticScreenshot: false};

    default:
      return state;
  }
};

export default camera;
