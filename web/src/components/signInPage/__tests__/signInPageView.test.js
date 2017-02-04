/*global describe it expect beforeAll afterAll beforeEach */

import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils, css } from 'aphrodite/no-important';
import SignInPageView from '../signInPageView';
import Style from '../signInPage.style';

describe('SignInPageView', () => {

  let signInPageView;
  const props = {};

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  beforeEach(() => {
    signInPageView = shallow(<SignInPageView {...props} />);
  });

  it('renders without exploding', () => {
    expect(signInPageView.length).toBe(1);
  });

  it('has a logo', () => {
    expect(elementExists(Style.logo)).toBe(true);
  });

  it('has a sign in button', () => {
    expect(elementExists(Style.SignInButton)).toBe(true);
    expect(elementText(Style.SignInButton)).toBe('Sign in');
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const elementExists = style => {
    return find(style).exists();
  };

  const elementText = style => {
    return find(style).text();
  };

  const find = style => {
    return signInPageView.find(`.${css(style)}`);
  };

});
