import React from 'react';
import Console from '../console';
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
  },
  overlay: {
    opacity: '0',
    transition: '.5s ease',
    ':hover': {
      opacity: '1'
    }
  },
  overlayBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: '0.72',
    background: 'linear-gradient(120deg, #391885, #72218A 10%, #7F70C4)',
  },
  overlayName: {
    position: 'absolute',
    bottom: '0px',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.8em',
    fontWeight: 'light',
    padding: '6px'
  },
  contextOnlyLink: {
    cursor: 'default'
  }
});

const preventClick = (e) => {
  e.preventDefault();
};

const onImageError = (img) => {
  Console.log('on image error');
  img.target.onerror = null;
  img.target.src = missingImage.payload;
};

class Item extends React.Component {

  render() {
    const name = this.props.name;
    const image = this.props.image || missingImage;
    const lastSeen = this.props.lastSeen;
    Console.log('render:', name);

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
        <a className={css(styles.contextOnlyLink)} onClick={preventClick} href={image.payload}>
          <div className={css(styles.overlay)} href={image.payload}>
            <div className={css(styles.overlayBackground)} />
            <div className={css(styles.overlayName)}>{name}</div>
          </div>
        </a>
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
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
  if (delta >= ONE_DAY || !lastSeen) {
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
