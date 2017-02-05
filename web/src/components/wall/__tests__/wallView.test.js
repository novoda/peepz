/*global Helper describe it expect*/

import React from 'react';
import WallView from '../wallView';

describe('WallView', () => {

  const props = { wall: [] };

  it('renders without exploding', () => {
    const _ = Helper.of(<WallView {...props} />);

    expect(_.rootExists()).toBe(true);
  });

});
