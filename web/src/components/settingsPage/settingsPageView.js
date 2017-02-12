import React from 'react';

export default class SettingsPageView extends React.Component {

  render() {
    return (<div>settings</div>);
  }

  componentDidMount() {
    this.props.fetchSignIn();
  }

}
