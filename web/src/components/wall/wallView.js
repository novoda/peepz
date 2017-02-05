import React from 'react';
import Item from '../item/Item';
import { MeContainer } from '../Me';
import { css } from 'aphrodite/no-important';
import Style from './wall.style';

const toPeepz = user => (peep, index) => {
    if (user.uid === peep.uid) {
      return (
        <li key={index} className={css(Style.item)}><MeContainer me={peep}/></li>
      );
    } else {
      return (
        <li key={index} className={css(Style.item)}>
          <Item image={peep.image} name={peep.name} lastSeen={peep.lastSeen}/>
        </li>
      );
    }
};

export default class Wall extends React.Component {

  render() {
    const peepz = this.props.wall.map(toPeepz(this.props.user));
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
