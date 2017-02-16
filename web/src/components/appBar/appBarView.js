import React from 'react';
import { css } from 'aphrodite/no-important';
import { Link } from 'react-router';
import Style from './appBar.style';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

export default ({toggleDrawer}) => {
  return (
    <div className={css(Style.appBarStyle)}>
      <div className={css(Style.containerStyle)}>
        <IconButton onClick={toggleDrawer} style={{marginLeft: '2%'}}>
          <NavigationMenu color={'#391885'} />
        </IconButton>

        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <button className={css(Style.titleStyle)}>Peepz</button>
        </Link>

        <Link to={'/settings'} className={css(Style.endContainer)}>
          <button className={css(Style.settingsStyle)}>Settings</button>
        </Link>
      </div>
    </div>
  );
};
