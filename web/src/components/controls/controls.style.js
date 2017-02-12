import { StyleSheet } from 'aphrodite/no-important';
import pictureTakeIcon from '../../../assets/ic_picturetake.png';

export default StyleSheet.create({
  pictureTakeIconStyle: {
    width: '36px',
    maxHeight: '100%',
    content: `url(${pictureTakeIcon})`
  },
  pictureTakeButtonStyle: {
    position: 'absolute',
    cursor: 'pointer',
    border: 'none',
    bottom: '0',
    right: '0',
    zIndex: '1',
    background: 'transparent'
  },
  closeButtonStyle: {
    position: 'absolute',
    zIndex: '1'
  },
  buttonStyle: {
    cursor: 'pointer',
  }
});
