const initialState = {
  isAdmin: false,
  rooms: []
};

const admin = (state = initialState, action) => {
  switch (action.type) {

    case 'onAdminListing': {
      const rooms = action.payload.map(room => {
        const members = toUser(room.individuals);
        const awaitingApproval = toUser(room.pending);
        return {
          id: room.id,
          members: members,
          awaitingApproval: awaitingApproval
        };
      });
      return {isAdmin: true, rooms };
    }

    default:
      return state;
  }
};

const toUser = usersObject => {
  const result = [];
  if (!usersObject) {
    return result;
  }
  Object.keys(usersObject).map(function(key) {
     result.push({uid: key, role: usersObject[key]});
  });
  return result;
};

export default admin;
