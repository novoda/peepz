import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
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
  },
  fullGray: {
    filter: 'grayscale(100%)'
  },
  seventyGray: {
    filter: 'grayscale(70%)'
  },
  halfGray: {
    filter: 'grayscale(50%)'
  },
  noGray: {
    filter: 'grayscale(0%)'
  }
});
