import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

export default class DrawerView extends React.Component {

  render() {
    return (
      <Drawer docked={false} open={this.props.open}
        onRequestChange={this.props.onRequestChange}>
        <Me user={this.props.user}/>
        <Divider />
        <Rooms onClose={this.props.onClose} />
        <Divider />
        <Settings />
      </Drawer>
    );
  }

}

const Me = ({user}) => {
  return (
      user ? <h1>{user.displayName}</h1> : null
  );
};

const Rooms = ({onClose}) => {
  return (
    <div>
      <h1>Rooms</h1>
      <MenuItem onTouchTap={onClose}>Menu Item</MenuItem>
      <MenuItem onTouchTap={onClose}>Menu Item 2</MenuItem>
    </div>
  );
};

const Settings = () => {
  return (
    <div></div>
  );
};
