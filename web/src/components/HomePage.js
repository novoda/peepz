import React from 'react';
import { WallContainer } from './Wall';
import { AppBar } from './AppBar';
import { connect } from 'react-redux';

import { requestSignIn as signIn, lastSeen, getAllScreenshots as fetchAllScreenshots} from '../firebase';

const FIVE_MINUTES = (60 * 5) * 1000;

class HomePage extends React.Component {

  render() {
    if (this.props.isSignedIn) {
      return (
        <div>
          <AppBar />
          <WallContainer />
        </div>
      );
    } else {
      return (
        <button onClick={this.props.requestSignIn}>sign in</button>
      );
    }
  }

  componentDidMount() {
    this.props.getAllScreenshots();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isSignedIn && this.props.isSignedIn) {
      this.props.startUpdatingLastSeen(this.props.user);
    }
  }

};

const HomePageContainer = connect(state => {
  return {
    isSignedIn: state.isSignedIn,
    user: state.user
  };
}, dispatch => {
  return {
    requestSignIn: () => {
        dispatch(signIn());
    },
    getAllScreenshots: () => {
      dispatch(fetchAllScreenshots());
    },
    startUpdatingLastSeen: (user) => {
      const updateLastSeen = () => {
        dispatch(lastSeen(user.uid));
        setTimeout(updateLastSeen, FIVE_MINUTES);
      };
      updateLastSeen();
    }
  };
})(HomePage);

export default HomePageContainer;
