import React from 'react';
import AppBar from '../appBar/AppBar';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const style = {
  paddingTop: '24px',
  margin: 'auto',
  width: '50%'
};

export default class SettingsPageView extends React.Component {

  render() {
    return (
      <div>
        <AppBar onLogoutClicked={this.props.onLogoutClicked}/>
        <div style={style}>
          <Me user={this.props.user}/>
          <div style={{height: '24px'}}/>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchSignIn();
  }

}

const Me = ({user}) => {
  return (
    <Card>
      <CardHeader
        title={user.displayName}
        subtitle={user.email}
        avatar={user.photoURL}
      />
      <CardText>ID : {user.uid}</CardText>
    </Card>
  );
};
