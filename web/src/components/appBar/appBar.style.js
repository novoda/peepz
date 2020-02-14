import { StyleSheet } from 'aphrodite/no-important'

export default {
  css: StyleSheet.create({
    appBarStyle: {
      height: '48px',
      width: '100%',
      backgroundColor: '#fafafa',
      borderBottom: 'solid 1px #f3f3f3',
      zIndex: '-1'
    },
    containerStyle: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center'
    },
    titleStyle: {
      background: 'linear-gradient(to right, #391885 5%, #72218A 62%, #7F70C4)',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      cursor: 'pointer',
      WebkitTextFillColor: 'transparent',
      WebkitBackgroundClip: 'text !important',
      fontSize: '1.4em',
      textAlign: 'center',
      border: 'none'
    },
    settingsStyle: {
      fontFamily: 'Montserrat, sans-serif',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#72218a',
      fontSize: '0.6em',
      cursor: 'pointer'
    },
    endContainer: {
      marginRight: '2%',
      marginLeft: 'auto'
    }
  }),
  js: {
    burgerContainer: {
      style: {
        marginLeft: '2%'
      }
    },
    burger: {
      color: '#391885'
    }
  }
}
