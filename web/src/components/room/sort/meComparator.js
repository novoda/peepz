const userComparator = meUid => (a, b) => {
  if (meUid === a.uid) {
    return -1;
  } else if (meUid === b.uid) {
    return 1;
  } else {
    return 0;
  }
};

export default userComparator;
