import React from 'react';
import { css } from 'aphrodite/no-important';
import Style from './signInPage.style';

export default ({ requestSignIn }) => {
  return (
    <div>
        <div className={css(Style.header)}></div>

        <div className={css(Style.logoContainer)}>
            <img className={css(Style.logo)}/>
        </div>

        <div className={css(Style.buttonContainer)}>
            <text className={css(Style.detail)}>Because the picture take</text>
        </div>
        <div className={css(Style.buttonContainer)}>
            <button onClick={requestSignIn} className={css(Style.SignInButton)}>Sign in</button>
        </div>

        <div className={css(Style.madeWithLoveContainer)}>
            <text className={css(Style.madeWithLove)}>Made with 😘 by Novoda</text>
        </div>
    </div>
  );
};
