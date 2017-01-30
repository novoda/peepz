import React from 'react';
import { connect } from 'react-redux';
import styles from './SignInStyle';
import { css } from 'aphrodite/no-important';
import { requestSignIn as signIn} from '../../firebase';

class SignInPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className={css(styles.header)}></div>

                <div className={css(styles.logoContainer)}>
                    <img className={css(styles.logo)} src='peepzLogo.png'/>
                </div>

                <div className={css(styles.buttonContainer)}>
                    <text className={css(styles.detail)}> Because someone is always watching</text>
                </div>
                <div className={css(styles.buttonContainer)}>
                    <button onClick={this.props.requestSignIn} className={css(styles.SignInButton)}>Sign in</button>
                </div>

                <div className={css(styles.madeWithLoveContainer)}>
                    <text className={css(styles.madeWithLove)}> Made with 😘 by Novoda</text>
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
