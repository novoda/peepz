import React from 'react';
import AppBar from '../appBar/AppBar';
import Room from '../room/Room';
import Drawer from '../drawer/Drawer';

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
          return <div>You are not a member of any rooms!</div>;
        default:
          return <Room roomId={roomId}/>;
    }
  }

  componentDidMount() {
    this.props.getRoomListings();
  }

}
