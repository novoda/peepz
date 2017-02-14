/*global describe it expect*/

import meComparator from '../meComparator';

describe('MeComparator', () => {

  const userId = '1234';
  const NOT_ME = { uid: '5678' };
  const ME = { uid: userId };

  it('not me peep is greater than me peep', () => {
    const result = meComparator(userId)(NOT_ME, ME);

    expect(result).toBe(1);
  });

  it('me peep is less than not me peep', () => {
    const result = meComparator(userId)(ME, NOT_ME);

    expect(result).toBe(-1);
  });

  it('not me peep is same as not me peep', () => {
    const result = meComparator(userId)(NOT_ME, NOT_ME);

    expect(result).toBe(0);
  });

});
