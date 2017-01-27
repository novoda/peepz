import React, { PropTypes } from 'react';

const appBarStyle = {
  height: '32px',
  width: '100%',
  backgroundColor: 'white',
  backgroundImage: 'linear-gradient(to right, #391885 5%, #72218A 62%, #7F70C4)',
  zIndex: '-1',
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
  justifyContent: 'space-between',
  paddingLeft: '4%',
  paddingRight: '2%'
};

const titleStyle = {
  color: 'white',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1em',
};

const logoutStyle = {
  fontFamily: 'Montserrat, sans-serif',
  backgroundColor: 'transparent',
  border: 'none',
  color: 'white',
  fontSize: '0.6em',
  cursor: 'pointer',
}

const AppBar = ({onLogoutClicked}) => {
  return (
    <div style={appBarStyle}>
      <div style={contentStyle}>
        <div style={containerStyle}>
          <div style={titleStyle}>Peepz</div>
          <button style={logoutStyle} onClick={onLogoutClicked}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export {
  AppBar
};
