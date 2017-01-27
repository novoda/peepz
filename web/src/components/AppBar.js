import React, { PropTypes } from 'react';

const appBarStyle = {
  height: '48px',
  width: '100%',
  backgroundColor: '#fafafa',
  border-bottom: 'solid 1px #f3f3f3',
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
background:-webkit-linear-gradient(#391885, #9e2ebf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1.4em',
};

const logoutStyle = {
  fontFamily: 'Montserrat, sans-serif',
  backgroundColor: 'transparent',
  border: 'none',
  color: #72218a,
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
