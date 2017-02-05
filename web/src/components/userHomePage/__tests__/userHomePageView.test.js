/*global Helper describe it expect */

import React from 'react';
import UserHomePageView from '../userHomePageView';

describe('UserHomePageView', () => {

  let _;
  const props = {};

  it('renders without exploding', () => {
    _ = Helper.of(<UserHomePageView {...props} />);

    expect(_.rootExists()).toBe(true);
  });

});
