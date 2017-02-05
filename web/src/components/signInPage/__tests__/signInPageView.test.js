/*global Helper describe it expect beforeAll afterAll beforeEach jest */

import React from 'react';
import SignInPageView from '../signInPageView';
import Style from '../signInPage.style';

describe('SignInPageView', () => {

  const requestSignIn = jest.fn();

  let _;
  const props = {};

  beforeAll(() => {
    Helper.suppressStyleInjection();
  });

  beforeEach(() => {
    _ = Helper.of(<SignInPageView {...props} />);
  });

  it('renders without exploding', () => {
    expect(_.rootExists()).toBe(true);
  });

  it('has a logo', () => {
    expect(_.elementExists(Style.logo)).toBe(true);
  });

  it('has a sign in button', () => {
    expect(_.elementExists(Style.SignInButton)).toBe(true);
    expect(_.elementText(Style.SignInButton)).toBe('Sign in');
  });

  it('triggers callback on sign in button click', () => {
    _ = Helper.of(<SignInPageView {...props} requestSignIn={requestSignIn} />);

    _.clickElement(Style.SignInButton);

    expect(requestSignIn).toBeCalled();
  });

  afterAll(() => {
    Helper.resumeStyleInjection();
  });

});
