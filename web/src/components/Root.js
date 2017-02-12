/*global document window safari*/

import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomePage from './homePage/HomePage';
import SettingsPage from './settingsPage/SettingsPage';

const isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

class Root extends React.Component {

  render() {
    if (isSafari) {
      return (<div>{"Safari isn't supported, soz"}</div>);
    }
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider>
          <Router history={browserHistory}>
            <Route path="/" component={HomePage}/>
            <Route path="/settings" component={SettingsPage}/>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }

  componentDidMount() {
    document.body.style.padding = 0;
    document.body.style.margin = 0;
  }

}

export default Root;
