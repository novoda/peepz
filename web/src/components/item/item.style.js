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
  makeOpaque: {
    transition: '.5s ease',
    opacity: '0.38'
  },
  overlayBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(120deg, #391885, #72218A 10%, #7F70C4)',
  },
  overlayName: {
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.8em',
    fontWeight: 'light',
    float: 'left'
  },
  contextOnlyLink: {
    cursor: 'default'
  },
  fullGray: {
    filter: 'grayscale(100%)'
  }
});
