const FOUR_HOURS = 4 * 60 * (60 * 1000);

const filter = now => user => peep => {
  if (user.uid === peep.uid) {
    return true;
  } else {
    return now - peep.lastSeen < FOUR_HOURS;
  }
};

export default filter;
