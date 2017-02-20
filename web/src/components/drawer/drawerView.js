import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';

export default class DrawerView extends React.Component {

  render() {
    return (
      <Drawer docked={false} open={this.props.open}
        onRequestChange={this.props.onRequestChange}>
        <Me user={this.props.user}/>
        <Divider />
        <Rooms onClose={this.props.onClose(this.props.user)} listings={this.props.roomListing} />
        <Divider />
        <Settings onToggled={this.props.onToggled} options={this.props.options} />
      </Drawer>
    );
  }

}

const Me = ({user}) => {
  return (
      user ? <h2>{user.displayName}</h2> : null
  );
};

const Rooms = ({onClose, listings}) => {
  const rooms = listings.map(each => {
    return (
      <MenuItem key={each.id} onTouchTap={onClose(each)}>{each.name}</MenuItem>
    );
  });
  return (
    <div>
      <h2>Rooms</h2>
      {rooms}
    </div>
  );
};

const Settings = ({options, onToggled}) => {
  return (
    <div>
      <h2>Options</h2>
      <Toggle onToggle={onToggled} toggled={options.showOffline} label={'Show offline peepz'}/>
    </div>
  );
};
