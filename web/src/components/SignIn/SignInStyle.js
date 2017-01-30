import { StyleSheet } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  SignInButton: {
      color: "white",
      fontSize: '1em',
      fontFamily: 'Montserrat',
      height: '48px',
      width: '220px',
      margin:'auto',
      marginTop:50,
      borderRadius: 50,
      border:0,
      backgroundColor: 'white',
      backgroundImage: 'linear-gradient(to left, #7F70C4, #391885 0%, #72218A 92%)',
  },
  buttonContainer: {
      width: '100%',
      display: 'flex',
  },
  madeWithLoveContainer: {
      width: '100%',
      display: 'flex',
      position: 'absolute',
      bottom:30
  },
  madeWithLove: {
      fontFamily: 'Montserrat',
      fontSize: '0.8em',
      color:'#b2b2b2',
      margin:'auto',
      bottom: 0,
  },
  header: {
     height: '32px',
     width: '100%',
     backgroundColor: 'white',
     backgroundImage: 'linear-gradient(to right, #391885 5%, #72218A 62%, #7F70C4)',
 },
 logoContainer: {
     width: '100%',
     display: 'flex'
 },
 logo: {
     height: '70px',
     margin:'auto',
     marginTop: '10em',
 },
 detail: {
     margin:'auto',
     marginTop: '30px',
     color:'#391885',
     fontFamily: 'Montserrat',
     fontWeight: 'light',
     fontSize: '0.8em',
 }
});

export default styles;
