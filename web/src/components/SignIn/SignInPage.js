import React from 'react';
import { connect } from 'react-redux';
const signInStyle = require('./SignInStyle');
import { requestSignIn as signIn} from '../../firebase';

class SignInPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div style={signInStyle.header}></div>

                <div style={signInStyle.logoContainer}>
                    <img style={signInStyle.logo} src='peepzLogo.png'/>
                </div>

                <div style={signInStyle.buttonContainer}>
                    <text style={signInStyle.detail}> Because someone is always watching</text>
                </div>
                <div style={signInStyle.buttonContainer}>
                    <button onClick={this.props.requestSignIn} style={signInStyle.SignInButton}>Sign in</button>
                </div>

                <div style={signInStyle.madeWithLoveContainer}>
                    <text style={signInStyle.madeWithLove}> Made with 😘 by Novoda</text>
                </div>
            </div>
        );
    }
}


const SignInContainer = connect(() => {
    return {};
}, dispatch => {
    return {
        requestSignIn: () => {
            dispatch(signIn());
        }
    };
})(SignInPage);

export default SignInContainer;
