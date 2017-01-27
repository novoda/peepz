import React from 'react';

const THIRTY_MINUTES = (30 * 60) * 1000;
const ONE_HOUR = (60 * 60) * 1000;
const ONE_DAY = ((60 * 24) * 60) * 1000;

const hodor = 'https://raw.githubusercontent.com/kolodny/babel-plugin-hodor/master/hodor.jpg'

const containerStyle = {
  position: 'relative',
  width: '100%',
  paddingBottom: '100%',
  zIndex: '-1'
};

const style = {
  width: '100%',
  position: 'absolute',
  height: '100%',
  border: '1px solid black',
  objectFit: 'cover'
};

const onImageError = (img) => {
  console.log('on image error');
  img.target.onerror = null;
  img.target.src = hodor;
};

class Item extends React.Component {

  render() {
    const name = this.props.name;
    const image = this.props.image || { payload: hodor, timestamp: 0 } ;
    const lastSeen = this.props.lastSeen;
    const imageStyle = {...style};

    console.log('render:', name)

    if (lastSeen) {
      imageStyle.filter = `grayscale(${lastSeenToFilter(lastSeen)}%)`;
    }
    return (
      <div style={containerStyle}>
        <img style={imageStyle} src={image.payload} onError={onImageError} alt={name}></img>
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
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

};

const lastSeenToFilter = (lastSeen) => {
  const delta = Date.now() - lastSeen;

  if (delta >= ONE_DAY) {
    return 100;
  } else if (delta >= ONE_HOUR) {
    return 70;
  } else if (delta >= THIRTY_MINUTES) {
      return 50;
  } else {
    return 0;
  }

};

export {
  Item
};
