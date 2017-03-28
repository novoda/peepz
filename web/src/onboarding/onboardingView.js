import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class OnboardingView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {canSubmit: false, textFieldValue: ''};
  }

  render() {
    return (
      <div>
        <div>You are not a member of any rooms, lets fix that!</div>
        <TextField
           value={this.state.textFieldValue}
           hintText="Room ID"
           floatingLabelText="Room ID"
           onChange={this._handleTextFieldChange(this)} />
        <RaisedButton onClick={this._handleSubmit(this)} label="JOIN" disabled={!this.state.canSubmit} />
      </div>
    );
  }

  _handleTextFieldChange(self) {
    return function(event) {
      const newText = event.target.value;
      self.setState({
          canSubmit: newText && newText.length > 1,
          textFieldValue: newText
      });
    };
  }

  _handleSubmit(self) {
    return function(event) {
      self.props.joinRoom(self.state.textFieldValue);
    };
  }

}
