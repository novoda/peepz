import React from 'react';
import { css } from 'aphrodite/no-important';
import { Link } from 'react-router';
import Style from './appBar.style';

export default ({onLogoutClicked}) => {
  return (
    <div className={css(Style.appBarStyle)}>
      <div className={css(Style.contentStyle)}>
        <div className={css(Style.containerStyle)}>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <h1 className={css(Style.titleStyle)}>Peepz</h1>
          </Link>
          <div>
            <Link to={'/settings'}>
              <button className={css(Style.logoutStyle)}>Settings</button>
            </Link>
            <button className={css(Style.logoutStyle)} onClick={onLogoutClicked}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};
