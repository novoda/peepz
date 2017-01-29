import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const THIRTY_MINUTES = (30 * 60) * 1000;
const ONE_HOUR = (60 * 60) * 1000;
const ONE_DAY = ((60 * 24) * 60) * 1000;

const missingImage = {
  payload: 'https://raw.githubusercontent.com/kolodny/babel-plugin-hodor/master/hodor.jpg',
  timestamp: 0
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    paddingBottom: '100%'
  },
  imageStyle: {
    width: '100%',
    position: 'absolute',
    height: '100%',
    objectFit: 'cover'
  }
});

const onImageError = (img) => {
  console.log('on image error');
  img.target.onerror = null;
  img.target.src = missingImage.payload;
};

class Item extends React.Component {

  render() {
    const name = this.props.name;
    const image = this.props.image || missingImage;
    const lastSeen = this.props.lastSeen;
    console.log('render:', name)

    const dynamicStyles = StyleSheet.create ({
      grayFilter: {
        filter: `grayscale(${lastSeenToFilterAmount(lastSeen)}%)`
      }
    });

    return (
      <div className={css(styles.container)}>
        <img className={css(styles.imageStyle, dynamicStyles.grayFilter)}
          src={image.payload}
          onError={onImageError}
          alt={name} />
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

const lastSeenToFilterAmount = lastSeen => {
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
