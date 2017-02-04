import React from 'react';
import UserHomePage from './UserHomePage';
import SignInPage from './signInPage/SignInPage';
import { connect } from 'react-redux';
import { fetchSignIn as fetch} from '../firebase';

class HomePage extends React.Component {

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

const HomePageContainer = connect(state => {
    return {
        isSignedIn: state.isSignedIn,
        isLoadingSignIn: state.loading.isLoadingSignIn
    };
}, dispatch => {
  return {
    fetchSignIn: () => {
      dispatch(fetch());
    }
  };
})(HomePage);

export default HomePageContainer;
