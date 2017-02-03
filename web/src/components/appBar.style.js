import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  appBarStyle: {
    height: '48px',
    width: '100%',
    backgroundColor: '#fafafa',
    borderBottom: 'solid 1px #f3f3f3',
    zIndex: '-1',
  },
  contentStyle: {
    listStyle: 'none',
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  containerStyle: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '4%',
    paddingRight: '2%'
  },
  titleStyle: {
    background: 'linear-gradient(to right, #391885 5%, #72218A 62%, #7F70C4)',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
    cursor: 'pointer',
    WebkitTextFillColor: 'transparent',
    WebkitBackgroundClip: 'text !important',
    fontSize: '1.4em',
  },
  logoutStyle: {
   fontFamily: 'Montserrat, sans-serif',
   backgroundColor: 'transparent',
   border: 'none',
   color: '#72218a',
   fontSize: '0.6em',
   cursor: 'pointer',
 }
});
