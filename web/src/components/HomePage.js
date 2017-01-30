import React from 'react';
import UserHomePage from './UserHomePage';
import SignInContainer from './SignIn/SignInPage';
import { connect } from 'react-redux';

class HomePage extends React.Component {

  render() {
    if (this.props.isLoadingSignIn) {
      return null;
    }
    
    if (this.props.isSignedIn) {
      return (<UserHomePage />);
    } else {
      return (<SignInContainer />);
    }
  }

}

const HomePageContainer = connect(state => {
    return {
        isSignedIn: state.isSignedIn,
        isLoadingSignIn: state.loading.isLoadingSignIn
    };
})(HomePage);

export default HomePageContainer;
