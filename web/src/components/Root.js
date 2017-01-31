/*global document window safari*/

import { Provider } from 'react-redux';
import React from 'react';
import HomePageContainer from './HomePage';

const isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

class Root extends React.Component {

  render() {
    if (isSafari) {
      return (<div>{"Safari isn't supported, soz"}</div>);
    }
    return (
      <Provider store={this.props.store}>
        <HomePageContainer />
      </Provider>
    );
  }

  componentDidMount() {
    document.body.style.padding = 0;
    document.body.style.margin = 0;
  }

}

export default Root;
