/*global Helper describe it expect beforeAll afterAll */

import React from 'react';
import HomePageView from '../homePageView';
import SignInPage from '../../signInPage/SignInPage';
import UserHomePage from '../../userHomePage/UserHomePage';

describe('HomePageView', () => {

  let _;
  const props = {};

  beforeAll(() => {
    Helper.suppressStyleInjection();
  });

  it('renders without exploding', () => {
    _ = Helper.of(<HomePageView {...props} />);

    expect(_.rootExists()).toBe(true);
  });

  it('shows nothing when sign in is loading', () => {
    _ = Helper.of(<HomePageView {...props} isLoadingSignIn />);

    expect(_.rootExists()).toBe(false);
  });

  it('shows the sign in page when not signed in', () => {
    _ = Helper.of(<HomePageView {...props} isSignedIn={false} />);

    expect(_.component(SignInPage).exists()).toBe(true);
  });

  it('shows the user home page when signed in', () => {
    _ = Helper.of(<HomePageView {...props} isSignedIn />);

    expect(_.component(UserHomePage).exists()).toBe(true);
  });

  afterAll(() => {
    Helper.resumeStyleInjection();
  });

});
