/*global setInterval clearInterval */

import React from 'react';
import Wall from '../wall/Wall';
import wallSort from './sort/wallSort';
import Progress from 'material-ui/CircularProgress';
import Styles from './room.style';

const FIVE_MINUTES = (60 * 5) * 1000;

export default class RoomView extends React.Component {

  constructor(props) {
    super(props);
    this.updateLastSeenTask = undefined;
  }

  render() {
    return (
      this.props.isLoadingRoom ?
        <Progress {...Styles.progress} />
        : <Wall wall={this._getWallContent()} />
    );
  }

  _getWallContent() {
    return this.props.wall.sort(wallSort(Date.now(), this.props.user.uid));
  }

  componentDidMount() {
    this.props.joinRoom(this.props.roomId, this.props.user);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.room && this.props.room) {
      this._startUpdatingLastSeen(this.props.roomId, this.props.user);
    }
  }

  _startUpdatingLastSeen(roomId, user) {
    const updateLastSeen = () => {
      this.props.updateLastSeen(roomId, user);
    };
    updateLastSeen();
    this.updateLastSeenTask = setInterval(updateLastSeen, FIVE_MINUTES);
  }

  componentWillUnmount() {
    if (this.updateLastSeenTask) {
      clearInterval(this.updateLastSeenTask);
    }
  }

}
