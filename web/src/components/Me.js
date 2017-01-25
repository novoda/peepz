import React from 'react';
import { Item } from './Item';
import { ControlsContainer } from './Controls';
import Webcam from '../webcam';
import { submitScreenshot } from '../firebase';
import { connect } from 'react-redux';

const hodor = 'https://raw.githubusercontent.com/kolodny/babel-plugin-hodor/master/hodor.jpg'

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

  render() {
    const self = this;
    if (this.props.isPreviewing) {
      return (
        <div>
          <Item image={this.props.me.image || hodor} />
          <div style={popOutWebcamStyle}>
            <ControlsContainer />
            <Webcam ref='webcam' audio={false} onUserMedia={() => {
              if (self.props.requestScreenshot) {
                const takeScreenshot = () => {
                  const user = self.props.user;
                  const screenshot = self.refs.webcam.getScreenshot();
                  self.props.screenshot(user, screenshot);
                };

                if (takeScreenshotTask) {
                  clearTimeout(takeScreenshotTask);
                }
                takeScreenshotTask = setTimeout(takeScreenshot, 5000);
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
      this.props.startScreenshot();
      if (autoScreenshotTask) {
        clearTimeout(autoScreenshotTask);
      }
      autoScreenshotTask = setTimeout(autoScreenshot, 20 * 1000);
    }
    setTimeout(autoScreenshot, 20 * 1000);
  }

  componentDidUpdate() {
    if (this.props.requestScreenshot && this.refs.webcam) {
      const screenshot = this.refs.webcam.getScreenshot();
      if (!screenshot) {
        return;
      }
      const user = this.props.user;
      this.props.screenshot(user, screenshot);
    } else if (this.props.requestScreenshot) {
      this.props.startPreview();
    }
  }

}

const MeContainer = connect(state => {
  return {
    isPreviewing: state.camera.isPreviewing,
    requestScreenshot: state.camera.requestScreenshot,
    photo: state.camera.photo,
    user: state.user
  };
}, dispatch => {
  return {
    startScreenshot: () => {
      dispatch({type: 'requestScreenshot'});
    },
    startPreview: () => {
      dispatch({type: 'onPreview'});
    },
    screenshot: (user, screenshot) => {
      dispatch({type: 'onScreenShot'});
      dispatch(submitScreenshot(user)(screenshot));
    },
    closePreview: () => {
      dispatch({type: 'onClosePreview'});
    }
  };
})(Me);

export {
  MeContainer
};
