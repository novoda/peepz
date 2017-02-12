/*global setInterval clearInterval */

import React from 'react';
import Wall from '../wall/Wall';
import AppBar from '../appBar/AppBar';

const FIVE_MINUTES = (60 * 5) * 1000;

export default class UserHomePageView extends React.Component {

  constructor(props) {
    super(props);
    this.updateLastSeenTask = undefined;
  }

  render() {
    return (
      <div>
        <AppBar onLogoutClicked={this.props.onLogoutClicked}/>
        <Wall />
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
