import { connect } from 'react-redux';
import React from 'react';
import { Item } from './Item';
import { MeContainer } from './Me';

const style = {
  listStyle: 'none',
  padding:'0',
  margin:'0',
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  overflow: 'hidden'
};

const itemStyle = {
  minWidth: '200px',
  maxWidth: '800px',
  flex: '1 1 auto',
};

const removeMe = user => each => {
  return user.uid === each.uid;
};

const findMe = user => each => {
  return user.uid !== each.uid;
};

const toPeepz = user => (peep, index) => {
    if (user.uid === peep.uid) {
      return (
        <li key={index} style={itemStyle}><MeContainer me={peep}/></li>
      );
    } else {
      return (
        <li key={index} style={itemStyle}>
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
      <ul style={style}>{all}</ul>
    );
  }

  _hackToFixLastRowWidths(startIndex) {
    return [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((each, index) => {
      return (
        <li key={startIndex + index} style={itemStyle}></li>
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
