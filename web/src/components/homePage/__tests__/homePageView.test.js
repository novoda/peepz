/*global Helper describe it expect beforeAll afterAll beforeEach */

import React from 'react';
import HomePageView from '../homePageView';

describe('HomePageView', () => {

  let _;
  const props = {};

  beforeAll(() => {
    Helper.suppressStyleInjection();
  });

  beforeEach(() => {
    _ = Helper.of(<HomePageView {...props} />);
  });

  it('renders without exploding', () => {
    expect(_.rootExists()).toBe(true);
  });

  it('shows the sign in page when not signed in', () => {
  });

  afterAll(() => {
    Helper.resumeStyleInjection();
  });

});
