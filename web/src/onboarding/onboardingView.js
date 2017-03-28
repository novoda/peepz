import React from 'react';

export default class OnboardingView extends React.Component {

  render() {
    return (<div>You are not a member of any rooms!</div>);
  }

  componentDidMount() {
    this.props.joinRoom('novoda');
  }

}
