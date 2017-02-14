const FITHTEEN_MINUTES = 15 * (60 * 1000);

const peepFreshnessComparator = now => (a, b) => {
  const aIsFresh = isFresh(now, a);
  const bIsFresh = isFresh(now, b);

  if (aIsFresh && bIsFresh || !aIsFresh && !bIsFresh) {
    return 0;
  }

  if (aIsFresh) {
    return -1;
  } else {
    return 1;
  }
};

const isFresh = (now, peep) => {
  return now - peep.lastSeen < FITHTEEN_MINUTES;
};

export default peepFreshnessComparator;
