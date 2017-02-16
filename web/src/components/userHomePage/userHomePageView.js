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
        <Room roomId={this.props.roomId}/>
      </div>
    );
  }

  componentDidMount() {
    // this.props.getRoomListings();
  }

}
