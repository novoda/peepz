/*global Helper describe it expect beforeAll afterAll beforeEach jest */

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
    // expect(_.length).toBe(1);
  });

  it('shows the sign in page when not signed in', () => {
  });

  afterAll(() => {
    Helper.resumeStyleInjection();
  });

});