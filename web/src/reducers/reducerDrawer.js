import values from 'object.values';

const intialState = {
  roomListing: [],
  open: false,
  options: { showOffline: true },
  cameraModeSelectionId: ''
};

const drawer = (state = intialState, action) => {
  switch(action.type) {
      case 'drawerClose':
        return {...state, open: false};
      case 'drawerChange':
        return {...state, open: action.state};
      case 'drawerToggle':
        return {...state, open: !state.open};
      case 'drawerOfflineChange': {
        const newOptions = {...state.options, showOffline: !state.options.showOffline};
        return {...state, options: newOptions};
      }
      case 'onRoomListing':
        return {...state, roomListing: values(action.payload)};
      case 'onUserRoomOptions':
        return {...state, cameraModeSelectionId: action.payload.cameraModeSelection};
      case 'onCameraModeSelected':
        return {...state, cameraModeSelectionId: action.payload.id};
      default:
        return state;
  }
};

export default drawer;
