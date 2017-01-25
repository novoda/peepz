import { Provider } from 'react-redux';
import React from 'react';
import HomePageContainer from './HomePage'

class Root extends React.Component {

  render() {
    return (
      <Provider store={this.props.store}>
        <HomePageContainer />
      </Provider>
    );
  }

  componentDidMount() {
    document.body.style.padding = 0;
    document.body.style.margin = 0;
    this.props.fetchSignIn();
  }

}

export default Root;
