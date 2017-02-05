/*global Helper describe it expect*/

import React from 'react';
import WallView from '../wallView';
import Me from '../../me/Me';
import Item from '../../item/Item';

describe('WallView', () => {

  const props = { wall: [], user: { uid: 'any'} };

  it('renders without exploding', () => {
    const _ = Helper.of(<WallView {...props} />);

    expect(_.rootExists()).toBe(true);
  });

  it('shows Me when a wall element uid matches the user id', () => {
    const user = { uid: 'userId' };
    const wall = [ { uid: 'userId'} ];
    const _ = Helper.of(<WallView wall={wall} user={user}/>);

    expect(_.component(Me).exists()).toBe(true);
  });

  it('shows an Item for each element of the wall that does not match the user id', () => {
    const wall = [ { uid: '1'}, { uid: '2'}, { uid: '3'} ];
    const _ = Helper.of(<WallView {...props} wall={wall} />);

    expect(_.component(Item).count()).toBe(wall.length);
  });

});
