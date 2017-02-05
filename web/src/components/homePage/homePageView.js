import React from 'react';
import UserHomePage from '../UserHomePage';
import SignInPage from '../signInPage/SignInPage';

export default class HomePageView extends React.Component {

  render() {
    if (this.props.isLoadingSignIn) {
      return null;
    }

    if (this.props.isSignedIn) {
      return (<UserHomePage />);
    } else {
      return (<SignInPage />);
    }
  }

  componentDidMount() {
    this.props.fetchSignIn();
  }

}
