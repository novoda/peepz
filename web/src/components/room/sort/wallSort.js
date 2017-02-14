import meComparator from './meComparator';
import imageFreshnessComparator from './imageFreshnessComparator';
import peepFreshnessComparator from './peepFreshnessComparator';

const sort = (now, userId) => (a, b) => {
  const comparators = [
    meComparator(userId),
    peepFreshnessComparator(now),
    imageFreshnessComparator
  ];

  let last = 0;
  comparators.some(comparator => {
    last = comparator(a, b);
    return last !== 0;
  });
  return last;
}

export default sort;
