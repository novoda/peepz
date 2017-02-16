/*global Helper describe it expect */

import React from 'react';
import SettingsPageView from '../settingsPageView';

describe('SettingsPageView', () => {

  let _;
  const props = {};

  it('renders without exploding', () => {
    _ = Helper.of(<SettingsPageView {...props} />);

    expect(_.rootExists()).toBe(true);
  });

});
