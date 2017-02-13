/*global describe it expect*/

import imageFreshness from '../imageFreshnessComparator';

describe('ImageFreshnessComparator', () => {

  const NO_IMAGE = {};
  const PEEP = { image: { timestamp: -1} };
  const FRESH_PEEP = { image: { timestamp: 1000} };
  const STALE_PEEP = { image: { timestamp: 0} };


  it('no image is greater than peep', () => {
    const result = imageFreshness(NO_IMAGE, PEEP);

    expect(result).toBe(1);
  });

  it('peep is less than no image peep', () => {
    const result = imageFreshness(PEEP, NO_IMAGE);

    expect(result).toBe(-1);
  });

  it('peep is same as peep', () => {
    const result = imageFreshness(PEEP, PEEP);

    expect(result).toBe(0);
  });

  it('no image is same as no image', () => {
    const result = imageFreshness(NO_IMAGE, NO_IMAGE);

    expect(result).toBe(0);
  });

  it('stale peep is greater than fresh peep', () => {
    const result = imageFreshness(STALE_PEEP, FRESH_PEEP);

    expect(result).toBe(1);
  });

  it('fresh peep is less than stale peep', () => {
    const result = imageFreshness(FRESH_PEEP, STALE_PEEP);

    expect(result).toBe(-1);
  });

});
