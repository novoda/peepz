import values from 'object.values';

const initialState = [];

const wall = (state = initialState, action) => {
  switch(action.type) {
    case 'onUpdate':
      return values(action.payload);

    case 'requestJoinRoom':
      return initialState;

    default:
      return state;
  }
};

export default wall;
