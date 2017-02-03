import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  container: {
    position: 'relative'
  },
  popOutWebcamStyle: {
    zIndex: '100',
    display: 'inline-block',
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '640px',
    height: '480px',
    get marginLeft () {
      return `calc(${this.width} / 2 - ${this.width})`;
    },
    get marginTop () {
      return `calc(${this.height} / 2 - ${this.height})`;
    }
  }
});
