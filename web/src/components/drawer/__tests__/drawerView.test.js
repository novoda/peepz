/*global Helper describe it expect */

import React from 'react';
import DrawerView from '../drawerView';

describe('DrawerView', () => {

  let _;
  const props = {
    onClose: () => {},
    user: {},
    onCameraModeSelected: () => {},
    roomListing: []
  };

  it('renders without exploding', () => {
    _ = Helper.of(<DrawerView {...props} />);

    expect(_.rootExists()).toBe(true);
  });

});
