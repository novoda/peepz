import React, { PropTypes } from 'react';

const appBarStyle = {
  height: '60px',
  width: '100%',
  backgroundColor: 'white',
  zIndex: '-1',
  boxShadow: '0px 0px 8px 1px #333'
};

const contentStyle = {
  listStyle: 'none',
  width: '100%',
  height: '100%',
  display: 'flex',
};

const logoWrapperStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const logoStyle = {
  border: 'none',
  color: 'black',
  backgroundColor: 'Transparent',
  cursor: 'pointer',
  fontSize: '27px',
};

const AppBar = ({user, isLoadingUser, isSignedIn, instanceId, onSignInClicked, onSignOutClicked}) => {
  return (
    <div style={appBarStyle}>
      <div style={contentStyle}>
        <div style={logoWrapperStyle}>
          <button style={logoStyle}>¯\_(ツ)_/¯</button>
        </div>
      </div>
    </div>
  );
};

export {
  AppBar
};
