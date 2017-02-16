import React from 'react';
import AppBar from '../appBar/AppBar';
import Room from '../room/Room';

export default class UserHomePageView extends React.Component {

  render() {
    return (
      <div>
        <AppBar />
        <Room roomId={this.props.roomId}/>
      </div>
    );
  }

  componentDidMount() {
    // this.props.getRoomListings();
  }

}
