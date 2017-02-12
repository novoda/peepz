/*global describe it expect*/

import wallFilter from '../wallFilter';

describe('WallFilter', () => {

  const FOUR_HOURS = 4 * 60 * (60 * 1000);

  const user = { uid: '1234'};

  it('does not filter when the peep uid is the same as the user uid', () => {
    const now = Date.now();
    const peep = { uid: user.uid };

    const isKept = wallFilter(now)(user)(peep);

    expect(isKept).toBe(true);
  });

  it('filters peepz when now is four hours more than the lastSeen', () => {
    const now = FOUR_HOURS + 1;
    const peep = { uid: 'anotherUser', lastSeen: 0 };

    const isKept = wallFilter(now)(user)(peep);

    expect(isKept).toBe(false);
  });

  it('keeps peepz when now is within four hours of the lastSeen', () => {
    const now = FOUR_HOURS - 1;
    const peep = { uid: 'anotherUser', lastSeen: 0 };

    const isKept = wallFilter(now)(user)(peep);

    expect(isKept).toBe(true);
  });

});
