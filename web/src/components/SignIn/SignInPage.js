import React from 'react';
import { connect } from 'react-redux';
import Style from './signInPage.style';
import { css } from 'aphrodite/no-important';
import { requestSignIn as signIn} from '../../firebase';

class SignInPage extends React.Component {

    render() {
        return (
            <div>
                <div className={css(Style.header)}></div>

                <div className={css(Style.logoContainer)}>
                    <img className={css(Style.logo)}/>
                </div>

                <div className={css(Style.buttonContainer)}>
                    <text className={css(Style.detail)}> Because someone is always watching</text>
                </div>
                <div className={css(Style.buttonContainer)}>
                    <button onClick={this.props.requestSignIn} className={css(Style.SignInButton)}>Sign in</button>
                </div>

                <div className={css(Style.madeWithLoveContainer)}>
                    <text className={css(Style.madeWithLove)}> Made with 😘 by Novoda</text>
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
