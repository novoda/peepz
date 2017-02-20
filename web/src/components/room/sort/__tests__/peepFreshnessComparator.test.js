/*global describe it expect*/

import peepFreshness from '../peepFreshnessComparator';

describe('ImageFreshnessComparator', () => {

  const FIFTEEN_MINUTES = 15 * (60 * 1000);
  const now = FIFTEEN_MINUTES + 1000;
  const FRESH_PEEP = { lastSeen: FIFTEEN_MINUTES };
  const STALE_PEEP = { lastSeen: 0 };

  it('stale peep is greater than peep', () => {
    const result = peepFreshness(now)(STALE_PEEP, FRESH_PEEP);

    expect(result).toBe(1);
  });

  it('fresh peep is less than stale peep', () => {
    const result = peepFreshness(now)(FRESH_PEEP, STALE_PEEP);

    expect(result).toBe(-1);
  });

  it('stale peep is same as stale peep', () => {
    const result = peepFreshness(now)(STALE_PEEP, STALE_PEEP);

    expect(result).toBe(0);
  });

  it('fresh peep is same as fresh peep', () => {
    const result = peepFreshness(now)(FRESH_PEEP, FRESH_PEEP);

    expect(result).toBe(0);
  });

});
