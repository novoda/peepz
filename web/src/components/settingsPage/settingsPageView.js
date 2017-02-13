import React from 'react';
import AppBar from '../appBar/AppBar';

export default class SettingsPageView extends React.Component {

  render() {
    return (
      <div>
        <AppBar onLogoutClicked={this.props.onLogoutClicked}/>
        <div>
          <div>User ID : {this.props.user.uid}</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchSignIn();
  }

}
