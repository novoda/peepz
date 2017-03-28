import React from 'react';
import AppBar from '../appBar/AppBar';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style = {
  paddingTop: '24px',
  margin: 'auto',
  width: '50%'
};

export default class SettingsPageView extends React.Component {

  render() {
    return (
      <div>
        <AppBar/>
        <div style={style}>
          <Me user={this.props.user} onLogoutClicked={this.props.onLogoutClicked}/>
          <div style={{height: '24px'}}/>
          { this.props.isAdmin ? <Admin rooms={this.props.rooms}/> : null }
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchSignIn();
    this.props.fetchAdmin();
  }

}

const Me = ({user, onLogoutClicked}) => {
  return (
    <Card>
      <CardHeader
        title={user.displayName}
        subtitle={user.email}
        avatar={user.photoURL}
      />
      <CardText>ID : {user.uid}</CardText>
      <CardActions style={{ width: '100%', textAlign: 'right' }}>
        <FlatButton style={{marginRight: '24px', color: '#7F70C4'}} label="Logout" onClick={onLogoutClicked}/>
      </CardActions>
    </Card>
  );
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  width: '100%'
};

const Admin = ({rooms}) => {
  const roomList = rooms.map(room => {
    return (
      <li key={room.id}>
        <Card>
          <CardHeader title={`Admin ${room.id}`}/>
          <CardHeader title="Awaiting approval"/>
          <ul style={listStyle}>{userList(room.awaitingApproval)}</ul>
          <CardHeader title="Members"/>
          <ul style={listStyle}>{userList(room.members)}</ul>
        </Card>
      </li>
    );
  });
  return (<ul style={listStyle}>{roomList}</ul>);
};

const userList = users => {
  return users.map(each => {
    return (
      <li>
        <CardText>{each.uid}</CardText>
        <CardText>{each.role}</CardText>
      </li>
    );
  });
};
