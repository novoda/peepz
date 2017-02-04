import React from 'react';
import { css } from 'aphrodite/no-important';
import Style from './appBar.style';

const AppBar = ({onLogoutClicked}) => {
  return (
    <div className={css(Style.appBarStyle)}>
      <div className={css(Style.contentStyle)}>
        <div className={css(Style.containerStyle)}>
          <h1 className={css(Style.titleStyle)}>Peepz</h1>
          <button className={css(Style.logoutStyle)} onClick={onLogoutClicked}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export {
  AppBar
};
