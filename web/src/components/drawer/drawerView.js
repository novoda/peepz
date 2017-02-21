import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import DropDownMenu from 'material-ui/DropDownMenu';

export default class DrawerView extends React.Component {

  render() {
    return (
      <Drawer docked={false} open={this.props.open}
        onRequestChange={this.props.onRequestChange}>
        <Me user={this.props.user}/>
        <Divider />
        <Rooms
          onClose={this.props.onClose(this.props.user)}
          listings={this.props.roomListing} />
        <Divider />
        <Settings
          onToggled={this.props.onToggled}
          options={this.props.options}
          cameraModes={this.props.cameraModes}
          cameraModeSelectionId={this.props.cameraModeSelectionId}
          onCameraModeSelected={this.props.onCameraModeSelected(this.props.user.uid, this.props.roomId)}/>
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

const Settings = ({options, onToggled, cameraModes, cameraModeSelectionId, onCameraModeSelected}) => {
  return (
    <div>
      <h2>Options</h2>
      <Toggle onToggle={onToggled} toggled={options.showOffline} label={'Show offline peepz'}/>
      <CameraMode cameraModes={cameraModes} cameraModeSelectionId={cameraModeSelectionId} onCameraModeSelected={onCameraModeSelected}/>
    </div>
  );
};

const CameraMode = ({cameraModes, cameraModeSelectionId, onCameraModeSelected}) => {
  const cameraOptions = cameraModes.sort((a, b) => {
    return a.sort - b.sort;
  }).map(each => {
    return (
      <MenuItem key={each.id} value={each.id} primaryText={each.label}/>
    );
  });

  const handleChange = cameraModes => (event, index, value) => {
    onCameraModeSelected(cameraModes.filter(each => each.id === value)[0]);
  };

  return (
    <div>
      <div>Camera mode:</div>
      <DropDownMenu
        value={cameraModeSelectionId}
        onChange={handleChange(cameraModes)}>
        {cameraOptions}
      </DropDownMenu>
    </div>
  );
};
