/*global setTimeout clearTimeout */

import Console from '../console';
import React from 'react';
import { Item } from './Item';
import { ControlsContainer } from './Controls';
import Webcam from '../webcam';
import { submitScreenshot } from '../firebase';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';

const hodor = 'https://raw.githubusercontent.com/kolodny/babel-plugin-hodor/master/hodor.jpg';
const TWO_MINTUES_MS = (2 * 60) * 1000;

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  popOutWebcamStyle: {
    display: 'inline-block',
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '640px',
    height: '480px',
    get marginLeft () {
      return `calc(${this.width} / 2 - ${this.width})`;
    },
    get marginTop () {
      return `calc(${this.height} / 2 - ${this.height})`;
    }
  }
});

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
          <div className={css(styles.popOutWebcamStyle)}>
            <ControlsContainer />
            <Webcam ref='webcam' audio={false} onUserMedia={() => {
              if (this.props.requestAutomaticScreenshot && this.props.cameraIsActive) {
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
        <div className={css(styles.container)}>
          <ControlsContainer />
          <Item image={this.props.me.image} lastSeen={Date.now()} />
        </div>
      );
    } else {
      return (
        <div className={css(styles.container)}>
          <ControlsContainer />
          <Item lastSeen={Date.now()}/>
        </div>
      );
    }
  }

  componentDidMount() {
    const autoScreenshot = () => {
      if (!this.props.requestAutomaticScreenshot) {
        this.props.automaticScreenshot();
      }
      if (this.autoScreenshotTask) {
        clearTimeout(this.autoScreenshotTask);
      }
      this.autoScreenshotTask = setTimeout(autoScreenshot, TWO_MINTUES_MS);
    };
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
      if (screenshot !== 'data:,') {
        dispatch(submitScreenshot(user)(screenshot));
      } else {
        Console.error('screenshot was invalid, skipping');
      }
    },
    closePreview: () => {
      dispatch({type: 'closePreview'});
    }
  };
})(Me);

export {
  MeContainer
};
