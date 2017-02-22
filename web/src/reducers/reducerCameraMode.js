const initialState = {
  selectionId: 'missing'
};

const cameraMode = (state = initialState, action) => {
  switch(action.type) {
    case 'onCameraModeSelected':
      return {...state, selectionId: action.payload.id};

    case 'onUserRoomOptions':
      return {...state, selectionId: action.payload.cameraModeSelection};

    default:
      return state;
  }
};

export default cameraMode;
