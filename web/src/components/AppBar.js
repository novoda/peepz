import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  appBarStyle: {
    height: '48px',
    width: '100%',
    backgroundColor: '#fafafa',
    borderBottom: 'solid 1px #f3f3f3',
    zIndex: '-1',
  },
  contentStyle: {
    listStyle: 'none',
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  containerStyle: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '4%',
    paddingRight: '2%'
  },
  titleStyle: {
    background: 'linear-gradient(to right, #391885 5%, #72218A 62%, #7F70C4)',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
    cursor: 'pointer',
    WebkitTextFillColor: 'transparent',
    WebkitBackgroundClip: 'text !important',
    fontSize: '1.4em',
  },
  logoutStyle: {
   fontFamily: 'Montserrat, sans-serif',
   backgroundColor: 'transparent',
   border: 'none',
   color: '#72218a',
   fontSize: '0.6em',
   cursor: 'pointer',
 }
});

const AppBar = ({onLogoutClicked}) => {
  return (
    <div className={css(styles.appBarStyle)}>
      <div className={css(styles.contentStyle)}>
        <div className={css(styles.containerStyle)}>
          <h1 className={css(styles.titleStyle)}>Peepz</h1>
          <button className={css(styles.logoutStyle)} onClick={onLogoutClicked}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export {
  AppBar
};
