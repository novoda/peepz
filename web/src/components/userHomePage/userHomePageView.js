import React from 'react';
import AppBar from '../appBar/AppBar';
import Room from '../room/Room';

export default class UserHomePageView extends React.Component {

  constructor(props) {
    super(props);
    this.updateLastSeenTask = undefined;
  }

  render() {
    return (
      <div>
        <AppBar onLogoutClicked={this.props.onLogoutClicked}/>
        <Room roomId={this.props.roomId}/>
      </div>
    );
  }

  componentDidMount() {
    // this.props.getRoomListings();
  }

}
