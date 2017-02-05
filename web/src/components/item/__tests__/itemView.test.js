/*global Helper describe it expect*/

import React from 'react';
import ItemView from '../itemView';

describe('ItemView', () => {

  const props = {};

  it('renders without exploding', () => {
    const _ = Helper.of(<ItemView {...props} />);

    expect(_.rootExists()).toBe(true);
  });

});
