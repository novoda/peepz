import React from 'react';
import Item from '../item/Item';
import Me from '../me/Me';
import { css } from 'aphrodite/no-important';
import Style from './wall.style';

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
    const peepz = this.props.wall.map(toPeepz(this.props.user))
      .concat(this._hackToFixLastRowWidths());
    return (
      <ul className={css(Style.list)}>{peepz}</ul>
    );
  }

  _hackToFixLastRowWidths() {
    return [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((each, index) => {
      return (
        <li key={index} className={css(Style.item)}></li>
      );
    });
  }

}
