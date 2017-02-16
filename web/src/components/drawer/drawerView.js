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
        <h1>Rooms</h1>
        <MenuItem onTouchTap={this.props.onClose}>Menu Item</MenuItem>
        <MenuItem onTouchTap={this.props.onClose}>Menu Item 2</MenuItem>
        <Divider />
      </Drawer>
    );
  }

}

const Me = ({user}) => {
  return (
      user ? <h1>{user.displayName}</h1> : null
  );
};
