/*global setInterval clearInterval */

import React from 'react';
import { WallContainer } from './Wall';
import { AppBar } from './appBar/AppBar';
import { connect } from 'react-redux';
import { lastSeen, getAllScreenshots as fetchAllScreenshots, logout} from '../firebase';

const FIVE_MINUTES = (60 * 5) * 1000;

class UserHome extends React.Component {

  constructor(props) {
    super(props);
    this.updateLastSeenTask = undefined;
  }

  render() {
    return (
      <div>
        <AppBar onLogoutClicked={this.props.onLogoutClicked}/>
        <WallContainer />
      </div>
    );
  }

  componentDidMount() {
    this.props.getAllScreenshots();
    this._startUpdatingLastSeen(this.props.user);
  }

  _startUpdatingLastSeen() {
    const updateLastSeen = () => {
      this.props.updateLastSeen(this.props.user);
    };
    this.updateLastSeenTask = setInterval(updateLastSeen, FIVE_MINUTES);
  }

  componentWillUnmount() {
    if (this.updateLastSeenTask) {
      clearInterval(this.updateLastSeenTask);
    }
  }

}

const UserHomeContainer = connect(
  state => { return { user: state.user }; },
  dispatch => {
    return {
      getAllScreenshots: () => {
        dispatch(fetchAllScreenshots());
      },
      updateLastSeen: (user) => {
        dispatch(lastSeen(user.uid));
      },
      onLogoutClicked: () => {
        dispatch(logout());
      }
    };
  }
)(UserHome);

export default UserHomeContainer;
