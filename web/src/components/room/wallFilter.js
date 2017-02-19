const DO_NOT_FILTER = true;
const FILTER = false;

const FIFTEEN_MINUTES = (60 * 15) * 1000;

const filter = userId => now => options => peep => {
  if (isMe(userId, peep)) {
    return DO_NOT_FILTER;
  } else if (!options.showOffline && isOffline(now, peep)) {
    return FILTER;
  } else {
    return DO_NOT_FILTER;
  }
};

const isMe = (userId, peep) => {
  return userId === peep.uid;
};

const isOffline = (now, peep) => {
  const delta = now - peep.lastSeen;
  return delta > FIFTEEN_MINUTES;
};

export default filter;
