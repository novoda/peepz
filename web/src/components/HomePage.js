import React from 'react';
import UserHomePage from './UserHomePage';
import { connect } from 'react-redux';

import { requestSignIn as signIn} from '../firebase';

class HomePage extends React.Component {

  render() {
    if (this.props.isSignedIn) {
      return (<UserHomePage />);
    } else {
      return (
        <button onClick={this.props.requestSignIn}>sign in</button>
      );
    }
  }

}

const HomePageContainer = connect(state => {
  return {
    isSignedIn: state.isSignedIn
  };
}, dispatch => {
  return {
    requestSignIn: () => {
      dispatch(signIn());
    }
  };
})(HomePage);

export default HomePageContainer;
