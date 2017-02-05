/*global Helper describe it expect*/

import React from 'react';
import AppBarView from '../appBarView';

describe('AppBarView', () => {

  const props = {};

  it('renders without exploding', () => {
    const _ = Helper.of(<AppBarView {...props} />);

    expect(_.rootExists()).toBe(true);
  });

});
