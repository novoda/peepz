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
        {
          this.props.roomId !== 'none' ?
          <Room roomId={this.props.roomId}/>
          : null
        }
      </div>
    );
  }

  componentDidMount() {
    this.props.getRoomListings();
  }

}
