import React from 'react';
import AppBar from '../appBar/AppBar';
import Room from '../room/Room';
import Drawer from '../drawer/Drawer';
import Onboarding from '../../onboarding/Onboarding';

export default class UserHomePageView extends React.Component {

  render() {
    return (
      <div>
        <Drawer />
        <AppBar />
        {this._roomWrapper(this.props.roomId)}
      </div>
    );
  }

  _roomWrapper(roomId) {
    switch(roomId) {
        case 'none':
          return null;
        case 'empty':
          return <Onboarding />
        default:
          return <Room roomId={roomId}/>;
    }
  }

  componentDidMount() {
    this.props.getRoomListings();
  }

}
