import React from 'react';
import { css } from 'aphrodite/no-important';
import { Link } from 'react-router';
import Style from './appBar.style';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

export default ({toggleDrawer}) => {
  return (
    <div className={css(Style.css.appBarStyle)}>
      <div className={css(Style.css.containerStyle)}>
        <IconButton onClick={toggleDrawer} {...Style.js.burgerContainer}>
          <NavigationMenu {...Style.js.burger} />
        </IconButton>

        <Link to={'/'}>
          <button className={css(Style.css.titleStyle)}>Peepz</button>
        </Link>

        <Link to={'/settings'} className={css(Style.css.endContainer)}>
          <button className={css(Style.css.settingsStyle)}>Settings</button>
        </Link>
      </div>
    </div>
  );
};
