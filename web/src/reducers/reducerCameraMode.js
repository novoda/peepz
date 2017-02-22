const FIVE_MINTUES_MS = (5 * 60) * 1000;

const initialState = {
  selection: {
    id: 'missing',
    interval: FIVE_MINTUES_MS
  }
};

const cameraMode = (state = initialState, action) => {
  switch(action.type) {
    case 'onCameraModeSelected':
      return {...state, selection: action.payload};
    default:
      return state;
  }
};

export default cameraMode;
