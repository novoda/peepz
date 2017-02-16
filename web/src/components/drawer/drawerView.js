import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class DrawerView extends React.Component {

  render() {
    return (
      <Drawer docked={false} open={this.props.open}
        onRequestChange={this.props.onRequestChange}>
        <MenuItem onTouchTap={this.props.onClose}>Menu Item</MenuItem>
        <MenuItem onTouchTap={this.props.onClose}>Menu Item 2</MenuItem>
      </Drawer>
    );
  }

}
