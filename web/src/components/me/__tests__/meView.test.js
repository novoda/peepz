/*global Helper describe it expect*/

import React from 'react';
import MeView from '../meView';

describe('MeView', () => {

  const props = { me: {} };

  it('renders without exploding', () => {
    const _ = Helper.of(<MeView {...props} />);

    expect(_.rootExists()).toBe(true);
  });

});
