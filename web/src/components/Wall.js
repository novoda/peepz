import { connect } from 'react-redux';
import React from 'react';
import { Item } from './Item';
import { MeContainer } from './Me';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  list: {
    listStyle: 'none',
    padding:'0',
    margin:'0',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    overflow: 'hidden'
  },
  item: {
    minWidth: '200px',
    maxWidth: '800px',
    flex: '1 1 auto',
  }
});

const removeMe = user => each => {
  return user.uid === each.uid;
};

const findMe = user => each => {
  return user.uid !== each.uid;
};

const toPeepz = user => (peep, index) => {
    if (user.uid === peep.uid) {
      return (
        <li key={index} className={css(styles.item)}><MeContainer me={peep}/></li>
      );
    } else {
      return (
        <li key={index} className={css(styles.item)}>
          <Item image={peep.image} name={peep.name} lastSeen={peep.lastSeen}/>
        </li>
      );
    }
}

class Wall extends React.Component {

  render() {
    const peepz = this.props.wall.map(toPeepz(this.props.user));
    const all = peepz.concat(this._hackToFixLastRowWidths(peepz.length));
    return (
      <ul className={css(styles.list)}>{all}</ul>
    );
  }

  _hackToFixLastRowWidths(startIndex) {
    return [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((each, index) => {
      return (
        <li key={startIndex + index} className={css(styles.item)}></li>
      );
    });
  }

}

const WallContainer = connect(state => {
  return {
    wall: state.wall,
    user: state.user
  };
})(Wall);

export {
  WallContainer
};
