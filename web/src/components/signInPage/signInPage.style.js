import { StyleSheet } from 'aphrodite/no-important';
import peepzLogo from '../../../assets/peepzLogo.png';

export default StyleSheet.create({
    SignInButton: {
        color: "white",
        fontSize: '0.8em',
        fontFamily: 'Montserrat',
        fontWeight:'300',
        height: '48px',
        width: '220px',
        margin:'auto',
        marginTop:50,
        borderRadius: 50,
        border:0,
        backgroundColor: 'white',
        backgroundImage: 'linear-gradient(to left, #7F70C4, #391885 0%, #72218A 92%)',
        boxShadow: '0 .7em 4em -.7em #72218A'

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
        height: '24px',
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
        content: `url(${peepzLogo})`
    },
    detail: {
        margin:'auto',
        marginTop: '30px',
        color:'#391885',
        fontFamily: 'Montserrat',
        fontWeight: 'light',
        fontSize: '.9em',
    }
});
