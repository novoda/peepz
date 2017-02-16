import React from 'react';
import { css } from 'aphrodite/no-important';
import { Link } from 'react-router';
import Style from './appBar.style';

export default ({toggleDrawer}) => {
  return (
    <div className={css(Style.appBarStyle)}>
      <div className={css(Style.contentStyle)}>
        <div className={css(Style.containerStyle)}>
          <button onClick={toggleDrawer}>foo</button>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <h1 className={css(Style.titleStyle)}>Peepz</h1>
          </Link>
          <Link to={'/settings'}>
            <button className={css(Style.settingsStyle)}>Settings</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
