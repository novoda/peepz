/*global describe it expect*/

import React from 'react';
import { shallow } from 'enzyme';
import controlsView from '../controlsView';

describe('ControlsView', () => {

  const props = {};

  it('renders without exploding', () => {
    expect(
      shallow(
        <controlsView  {...props} />
      ).length
    ).toBe(1);
  });

});
