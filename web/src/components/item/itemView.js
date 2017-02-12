import React from 'react';
import Console from '../../console';
import { css } from 'aphrodite/no-important';
import Style from './item.style';

const THIRTY_MINUTES = (30 * 60) * 1000;
const ONE_HOUR = (60 * 60) * 1000;
const ONE_DAY = ((60 * 24) * 60) * 1000;

const missingImage = {
  payload: 'https://raw.githubusercontent.com/kolodny/babel-plugin-hodor/master/hodor.jpg',
  timestamp: 0
};

const onImageError = (img) => {
  Console.log('on image error');
  img.target.onerror = null;
  img.target.src = missingImage.payload;
};

export default class Item extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHovering: false
    };
  }

  render() {
    const name = this.props.name;
    const image = this.props.image || missingImage;
    const lastSeen = this.props.lastSeen;
    Console.log('render:', name);

    const availabilityFilter = lastSeenToFilterAmount(lastSeen);
    const onMouseEnter = this._onMouseEnter.bind(this);
    const onMouseLeave = this._onMouseExit.bind(this);

    return (
      <div className={css(Style.container)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className={css(Style.overlayBackground)} />
        <img className={css(Style.imageStyle, availabilityFilter, this.state.isHovering && Style.makeOpaque)}
          src={image.payload}
          onError={onImageError}
          alt={name} />
        {this.state.isHovering ? <div className={css(Style.overlayName)}>{name}</div> : null}
      </div>
    );
  }

  _onMouseEnter() {
    this.setState({isHovering: true});
  }

  _onMouseExit() {
    this.setState({isHovering: false});
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isHovering !== nextState.isHovering) {
      return true;
    }

    const currentImage = this.props.image;
    const nextImage = nextProps.image;
    return this._timestampsAreDifferent(currentImage, nextImage);
  }

  _timestampsAreDifferent(currentImage, nextImage) {
    if (!currentImage && !nextImage) {
      return false;
    }

    if (currentImage && !nextImage) {
      return false;
    }

    if (!currentImage && nextImage) {
      return true;
    }

    return currentImage.timestamp !== nextImage.timestamp;
  }

}

const lastSeenToFilterAmount = lastSeen => {
  const delta = Date.now() - lastSeen;
  if (!lastSeen || delta >= ONE_DAY) {
    return Style.fullGray;
  } else if (delta >= ONE_HOUR) {
    return Style.seventyGray;
  } else if (delta >= THIRTY_MINUTES) {
      return Style.halfGray;
  } else {
    return Style.noGray;
  }

};
