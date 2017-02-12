/*global setInterval clearInterval */

import React from 'react';
import Wall from '../wall/Wall';
import Progress from 'material-ui/CircularProgress';
import wallFilter from './wallFilter';

const FIVE_MINUTES = (60 * 5) * 1000;

const foobar = {
  style: {
    width: '100%',
    height: '50vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  color: '#72218A',
  size: 100
};

export default class UserHomePageView extends React.Component {

  constructor(props) {
    super(props);
    this.updateLastSeenTask = undefined;
  }

  render() {
    return (
      this.props.isLoadingRoom ?
        <Progress {...foobar} />
        : <Wall wall={this._getWallContent()} />
    );
  }

  _getWallContent() {
    return this.props.wall.filter(wallFilter(this.props.user));
  }

  componentDidMount() {
    this.props.joinRoom(this.props.roomId, this.props.user);
    this._startUpdatingLastSeen(this.props.roomId, this.props.user);
  }

  _startUpdatingLastSeen(roomId, user) {
    const updateLastSeen = () => {
      this.props.updateLastSeen(roomId, user);
    };
    this.updateLastSeenTask = setInterval(updateLastSeen, FIVE_MINUTES);
  }

  componentWillUnmount() {
    if (this.updateLastSeenTask) {
      clearInterval(this.updateLastSeenTask);
    }
  }

}
