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

class Wall extends React.Component {

  render() {
    const self = this;
    const user = this.props.user;
    const otherPeeps = this.props.wall.map((each, index) => {
        if (user.uid === each.uid) {
          return self._getMe(index, each);
        } else {
          return (
            <li key={index} style={itemStyle}>
              <Item image={each.image} name={each.name} lastSeen={each.lastSeen}/>
            </li>
          );
        }
    });


    const all = otherPeeps.concat(this._hackToFixLastRowWidths(otherPeeps.length));

    return (
      <ul style={style}>{all}</ul>
    );
  }

  _getMe(index, me) {
    return (
      <li key={index} style={itemStyle}><MeContainer me={me}/></li>
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
