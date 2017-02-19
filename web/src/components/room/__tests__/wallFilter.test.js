/*global describe it expect*/

import wallFilter from '../wallFilter';

describe('WallFilter', () => {

  const FITHTEEN_MINUTES = (60 * 15) * 1000;

  const userId = '1234';
  const now = 0;
  const offlineLastSeen = now - (FITHTEEN_MINUTES + 1000);
  const NOT_ME_OFFLINE = { uid: '5678', lastSeen: offlineLastSeen};
  const ME_OFFLINE = { uid: userId,  lastSeen: offlineLastSeen};
  const HIDE_OFFLINE = { showOffline: false };
  const SHOW_OFFLINE = { showOffline: true };

  it('does not filter out me even if offline', () => {
    const result = wallFilter(userId)(now)(HIDE_OFFLINE)(ME_OFFLINE);

    expect(result).toBe(true);
  });

  it('does not filter offline with show offline option', () => {
    const result = wallFilter(userId)(now)(SHOW_OFFLINE)(NOT_ME_OFFLINE);

    expect(result).toBe(true);
  });

  it('filters offline peepz', () => {
    const result = wallFilter(userId)(now)(HIDE_OFFLINE)(NOT_ME_OFFLINE);

    expect(result).toBe(false);
  });

});
