import values from 'object.values';

const offlineTimeout = 900000;
const initialState = {
  options: {
    cameraModes: [],
    offlineTimeout
  }
};

const room = (state = initialState, action) => {
  switch(action.type) {
    case 'onRoomOptions':
      return {...state, options: {...action.payload, cameraModes: values(action.payload.cameraModes)}};

    case 'onRoomJoined':
      return {...state, id: action.payload};

    default:
      return state;
  }
};

export default room;
