import React, { PropTypes } from 'react';

const appBarStyle = {
  height: '68px',
  width: '100%',
  backgroundColor: 'white',
  backgroundImage: 'linear-gradient(to right, #391885 5%, #72218A 62%, #7F70C4)',
  zIndex: '-1',
  boxShadow: '0px 0px 8px 1px #333'
};

const contentStyle = {
  listStyle: 'none',
  width: '100%',
  height: '100%',
  display: 'flex',
};

const containerStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '4%'
};

const titleStyle = {
  border: 'none',
  color: 'white',
  fontFamily: 'Montserrat, sans-serif',
  backgroundColor: 'Transparent',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '27px',
};

const AppBar = ({user, isLoadingUser, isSignedIn, instanceId, onSignInClicked, onSignOutClicked}) => {
  return (
    <div style={appBarStyle}>
      <div style={contentStyle}>
        <div style={containerStyle}>
          <div style={titleStyle}>Peepz</div>
        </div>
      </div>
    </div>
  );
};

export {
  AppBar
};
