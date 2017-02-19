/*global Helper describe it expect */

import React from 'react';
import RoomView from '../roomView';

describe('RoomView', () => {

  let _;
  const props = { user: { uid: {} }, wall: [], nowProvider: () => 0 };

  it('renders without exploding', () => {
    _ = Helper.of(<RoomView {...props} />);

    expect(_.rootExists()).toBe(true);
  });

});
