/*global setInterval clearInterval setTimeout clearTimeout */

import React from 'react';
import Item from '../item/Item';
import Controls from '../controls/Controls';
import Webcam from 'react-webcam';
import { css } from 'aphrodite/no-important';
import Style from './me.style';

const hodor = 'https://raw.githubusercontent.com/kolodny/babel-plugin-hodor/master/hodor.jpg';

export default class MeView extends React.Component {

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
          <div className={css(Style.popOutWebcamStyle)}>
            <Controls />
            <Webcam ref='webcam' audio={false} onUserMedia={() => {
              if (this.props.requestAutomaticScreenshot && this.props.cameraIsActive) {
                const takeScreenshot = (webcam, roomId, user) => () => {
                  const screenshot = webcam.getScreenshot();
                  this.props.screenshot(roomId, user, screenshot);
                };

                if (this.takeScreenshotTask) {
                  clearTimeout(this.takeScreenshotTask);
                }

                this.takeScreenshotTask = setTimeout(takeScreenshot(
                    this.refs.webcam, this.props.roomId, this.props.user
                ), 5000);
              }
            }}/>
          </div>
        </div>
      );
    }

    if (this.props.me.image) {
      return (
        <div className={css(Style.container)}>
          <Controls />
          <Item image={this.props.me.image} lastSeen={Date.now()} />
        </div>
      );
    } else {
      return (
        <div className={css(Style.container)}>
          <Controls />
          <Item lastSeen={Date.now()}/>
        </div>
      );
    }
  }

  componentDidMount() {
    this._scheduleAutomaticPhotos(this.props.cameraModeSelection);
  }

  _scheduleAutomaticPhotos(cameraModeSelection) {
    if (this.autoScreenshotTask) {
      clearInterval(this.autoScreenshotTask);
    }
    const autoScreenshot = () => {
      if (!this.props.requestAutomaticScreenshot) {
        this.props.automaticScreenshot();
      }
    };
    const cameraInterval = cameraModeSelection.interval;
    if (cameraInterval > 0) {
      this.autoScreenshotTask = setInterval(autoScreenshot, cameraInterval);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.requestManualScreenshot) {
      const screenshot = this.refs.webcam.getScreenshot();
      const user = this.props.user;
      const roomId = this.props.roomId;
      this.props.screenshot(roomId, user, screenshot);
    }

    if (prevProps.cameraModeSelection.id !== this.props.cameraModeSelection.id) {
      this._scheduleAutomaticPhotos(this.props.cameraModeSelection);
    }
  }

  componentWillUnmount() {
    if (this.autoScreenshotTask) {
      clearInterval(this.autoScreenshotTask);
    }
  }

}
