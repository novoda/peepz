import React from 'react'
import Console from '../../console'
import { css } from 'aphrodite/no-important'
import Style from './item.style'

const FIFTEEN_MINUTES = 15 * 60 * 1000

const missingImage = {
  payload: 'https://raw.githubusercontent.com/kolodny/babel-plugin-hodor/master/hodor.jpg',
  timestamp: 0
}

const onImageError = img => {
  Console.log('on image error')
  img.target.onerror = null
  img.target.src = missingImage.payload
}

export default class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovering: false
    }
  }

  render() {
    const name = this.props.name
    const place = this.props.place || ''
    const image = this.props.image || missingImage
    const lastSeen = this.props.lastSeen
    const availabilityFilter = lastSeenToFilterAmount(lastSeen)
    const onMouseEnter = this._onMouseEnter.bind(this)
    const onMouseLeave = this._onMouseExit.bind(this)
    return (
      <div className={css(Style.container)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {this.state.isHovering ? <div className={css(Style.overlayBackground)} /> : null}

        <img
          className={css(Style.imageStyle, availabilityFilter, this.state.isHovering && Style.makeOpaque)}
          src={image.payload}
          onError={onImageError}
          alt={name}
        />

        {this.state.isHovering ? (
          <div className={css(Style.infoContainer)}>
            <div className={css(Style.overlayPlace)}> {place ? `🏢 ${place}` : '🏢'} </div>
            <Indicator lastSeen={lastSeen} imageTimestamp={image.timestamp} />
            <div className={css(Style.overlayName)}>{name}</div>
          </div>
        ) : (
          <div className={css(Style.infoContainer)}>
            <div className={css(Style.overlayPlace)}> {place ? `🏢 ${place}` : '🏢'} </div>
            <Indicator lastSeen={lastSeen} imageTimestamp={image.timestamp} />
          </div>
        )}
      </div>
    )
  }

  _onMouseEnter() {
    this.setState({ isHovering: true })
  }

  _onMouseExit() {
    this.setState({ isHovering: false })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isHovering !== nextState.isHovering) {
      return true
    }

    const currentImage = this.props.image
    const nextImage = nextProps.image
    return this._timestampsAreDifferent(currentImage, nextImage)
  }

  _timestampsAreDifferent(currentImage, nextImage) {
    if (!currentImage && !nextImage) {
      return false
    }

    if (currentImage && !nextImage) {
      return false
    }

    if (!currentImage && nextImage) {
      return true
    }

    return currentImage.timestamp !== nextImage.timestamp
  }
}

const lastSeenToFilterAmount = lastSeen => {
  const delta = Date.now() - lastSeen
  if (!lastSeen || delta >= FIFTEEN_MINUTES) {
    return Style.fullGray
  } else {
    return false
  }
}

const Indicator = ({ lastSeen, imageTimestamp }) => {
  const indicatorColor = calculateIndicatorColour(lastSeen, imageTimestamp)
  return (
    <div className={css(Style.indicatorWrapper)}>
      <div className={css(Style.indicatorCircle, indicatorColor)}></div>
    </div>
  )
}

const calculateIndicatorColour = (lastSeen, imageTimestamp) => {
  const isOffline = Date.now() - lastSeen > FIFTEEN_MINUTES
  const isIdle = Date.now() - imageTimestamp > FIFTEEN_MINUTES
  if (isOffline) {
    return Style.indicatorOffline
  } else if (isIdle) {
    return Style.indicatorIdle
  } else {
    return Style.indicatorOnline
  }
}
