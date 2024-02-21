import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

const getWindSpeedColor = (speed) => {
  if (speed < 10) return '#9da5b1'
  if (speed >= 10 && speed < 20) return '#39f'
  if (speed >= 20 && speed < 30) return '#2eb85c'
  if (speed >= 30 && speed < 35) return '#f9b115'
  if (speed >= 35 && speed < 40) return '#fd7e14'
  if (speed >= 40 && speed < 45) return '#dc3545'
  if (speed >= 45) return '#6f42c1'
  return '#9da5b1' // Default color
}

const WindIndicator = ({ direction, speed }) => {
  // Style to rotate the icon based on windDirection
  const iconStyle = {
    transform: `rotate(${direction}deg)`,
    transition: 'transform 2.5s ease-out',
  }

  const color = getWindSpeedColor(speed)

  return (
    <>
      <div className="d-none d-md-block">
        <small className="text-body text-opacity-75">
          Wind{' '}
          <FontAwesomeIcon icon={faArrowDown} style={{ ...iconStyle, color: color }} size="lg" />{' '}
          {speed} km/h
        </small>
      </div>
      <div className="mx-auto d-md-none">
        <small className="text-body text-opacity-75">
          <FontAwesomeIcon icon={faArrowDown} style={{ ...iconStyle, color: color }} size="lg" />{' '}
          {speed} km/h
        </small>
      </div>
    </>
  )
}

WindIndicator.propTypes = {
  direction: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
}

export default WindIndicator
