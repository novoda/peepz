const initialState = {
  isLoadingSignIn: true,
  isLoadingRoom: true
};

const loading = (state = initialState, action) => {
  switch(action.type) {
    case 'fetchSignIn':
      return {...state, isLoadingSignIn: true};

    case 'onSignedIn':
    case 'onSignedOut':
      return {...state, isLoadingSignIn: false};

    case 'requestJoinRoom':
      return {...state, isLoadingRoom: true};

    case 'onRoomLoaded':
    case 'onRoomError':
      return {...state, isLoadingRoom: false};

    default:
      return state;
  }
};

export default loading;
