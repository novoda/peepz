const fetchSignIn = {
  type: 'fetchSignIn'
};

const requestSignIn = {
  type: 'requestSignIn'
};

const lastSeen = {
  type: 'lastSeen'
};

const logout = {
  type: 'logout'
};

const roomListing = {
  type: 'roomListing'
};

const joinRoom = roomId => {
  return {
    type: 'joinRoom',
    payload: roomId
  };
};

const updateUserRoomOptions = options => {
  return {
    type: 'updateUserRoomOptions',
    payload: options
  };
};

const submitScreenshot = picture => {
  return {
    type: 'submitScreenshot',
    payload: picture
  };
};

export {
  fetchSignIn,
  requestSignIn,
  submitScreenshot,
  lastSeen,
  logout,
  roomListing,
  joinRoom,
  updateUserRoomOptions
};
