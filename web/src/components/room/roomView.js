/*global setInterval clearInterval */

import React from 'react';
import Wall from '../wall/Wall';
import wallSort from './sort/wallSort';
import wallFilter from './wallFilter';
import Progress from 'material-ui/CircularProgress';
import Styles from './room.style';

const FIVE_MINUTES = (2 * 60) * 1000;

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
    const now = this.props.nowProvider();
    const userId = this.props.user.uid;
    const filterOptions = this.props.filterOptions;
    const filter = wallFilter(userId)(now)(filterOptions);
    return this.props.wall.filter(filter)
      .sort(wallSort(now, userId));
  }

  componentDidMount() {
    this.props.joinRoom(this.props.roomId);
  }

  componentDidUpdate(prevProps) {
    if (this._hasJoinedRoom(prevProps)) {
      this._startUpdatingLastSeen();
    }
  }

  _hasJoinedRoom(prevProps) {
    return !prevProps.room.id && this.props.room.id;
  }

  _startUpdatingLastSeen() {
    const updateLastSeen = () => {
      this.props.updateLastSeen();
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
