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
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchSignIn();
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
