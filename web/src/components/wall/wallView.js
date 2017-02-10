import React from 'react';
import Item from '../item/Item';
import Me from '../me/Me';
import { css } from 'aphrodite/no-important';
import Style from './wall.style';
import filter from './wallFilter';

const toPeepz = user => peep => {
    if (user.uid === peep.uid) {
      return (
        <li key={peep.uid} className={css(Style.item)}><Me me={peep}/></li>
      );
    } else {
      return (
        <li key={peep.uid} className={css(Style.item)}>
          <Item image={peep.image} name={peep.name} lastSeen={peep.lastSeen}/>
        </li>
      );
    }
};

export default class Wall extends React.Component {

  render() {
    const now = Date.now();
    const peepz = this.props.wall.filter(filter(now)(this.props.user))
      .map(toPeepz(this.props.user));

    const all = peepz.concat(this._hackToFixLastRowWidths(peepz.length));
    return (
      <ul className={css(Style.list)}>{all}</ul>
    );
  }

  _hackToFixLastRowWidths(startIndex) {
    return [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((each, index) => {
      return (
        <li key={startIndex + index} className={css(Style.item)}></li>
      );
    });
  }

}
