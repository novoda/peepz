import React from 'react';
import { Item } from './Item';
import { ControlsContainer } from './Controls';
import Webcam from '../webcam';
import { submitScreenshot } from '../firebase';
import { connect } from 'react-redux';

const hodor = 'https://raw.githubusercontent.com/kolodny/babel-plugin-hodor/master/hodor.jpg'
const TWO_MINTUES_MS = (2 * 60) * 1000;

const style = {
  width: '100%',
  position: 'absolute',
  height: '100%',
  border: '1px solid black',
  objectFit: 'cover'
};

const popOutWebcamStyle = {
  display: 'inline-block',
  left: '50%',
  top: '50%',
  width: '640px',
  height: '480px',
  marginLeft: '-320px',
  marginTop: '-240px',
  position: 'absolute',
};

let takeScreenshotTask;
let autoScreenshotTask;

class Me extends React.Component {

  constructor(props) {
    super(props);
    this.takeScreenshotTask = undefined;
    this.autoScreenshotTask = undefined;
  }

  render() {
    if (this.props.cameraIsActive) {
      return (
        <div>
          <Item image={this.props.me.image || hodor} />
          <div style={popOutWebcamStyle}>
            <ControlsContainer />
            <Webcam ref='webcam' audio={false} onUserMedia={() => {
              if (this.props.requestScreenshot && this.props.isPreviewing) {
                const takeScreenshot = (webcam, user) => () => {
                  const screenshot = webcam.getScreenshot();
                  this.props.screenshot(user, screenshot);
                };

                if (this.takeScreenshotTask) {
                  clearTimeout(this.takeScreenshotTask);
                }

                this.takeScreenshotTask = setTimeout(takeScreenshot(
                  this.refs.webcam, this.props.user
                ), 5000);
              }
            }}/>
          </div>
        </div>
      );
    }

    if (this.props.me.image) {
      return (
        <div>
          <ControlsContainer />
          <Item image={this.props.me.image} lastSeen={Date.now()} />
        </div>
      );
    } else {
      return (
        <div>
          <ControlsContainer />
          <Item lastSeen={Date.now()}/>
        </div>
      );
    }
  }

  componentDidMount() {
    const autoScreenshot = () => {
      if (!this.props.requestScreenshot) {
        this.props.automaticScreenshot();
      }
      if (this.autoScreenshotTask) {
        clearTimeout(this.autoScreenshotTask);
      }
      this.autoScreenshotTask = setTimeout(autoScreenshot, TWO_MINTUES_MS);
    }
    this.autoScreenshotTask = setTimeout(autoScreenshot, TWO_MINTUES_MS);
  }

  componentDidUpdate() {
    if (this.props.requestManualScreenshot) {
      const screenshot = this.refs.webcam.getScreenshot();
      const user = this.props.user;
      this.props.screenshot(user, screenshot);
    }
  }

}

const MeContainer = connect(state => {
  return {
    cameraIsActive: state.camera.active,
    requestAutomaticScreenshot: state.camera.requestAutomaticScreenshot,
    requestManualScreenshot: state.camera.requestManualScreenshot,
    user: state.user,
  };
}, dispatch => {
  return {
    automaticScreenshot: () => {
      dispatch({type: 'automaticScreenshot'});
    },
    screenshot: (user, screenshot) => {
      dispatch({type: 'closeCamera'});
      dispatch(submitScreenshot(user)(screenshot));
    },
    closePreview: () => {
      dispatch({type: 'closePreview'});
    }
  };
})(Me);

export {
  MeContainer
};
