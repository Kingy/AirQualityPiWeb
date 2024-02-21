import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSun,
  faMoon,
  faCloudRain,
  faSnowflake,
  faSmog,
  faWind,
  faCloud,
  faCloudSun,
  faCloudMoon,
} from '@fortawesome/free-solid-svg-icons'

const weatherIconMap = {
  'clear-day': faSun,
  'clear-night': faMoon,
  rain: faCloudRain,
  snow: faSnowflake,
  sleet: faSnowflake,
  wind: faWind,
  fog: faSmog,
  cloudy: faCloud,
  'partly-cloudy-day': faCloudSun,
  'partly-cloudy-night': faCloudMoon,
  // Add more mappings as needed
}

const iconStyle = (condition) => {
  switch (condition) {
    case 'clear-day':
    case 'clear-night':
      return { color: '#f9b115' }
    case 'cloudy':
    case 'partly-cloudy-day':
    case 'partly-cloudy-night':
      return { color: '#8a93a2' }
    case 'rain':
    case 'snow':
    case 'sleet':
      return { color: '#321fdb' }
    case 'fog':
      return { color: '#4f5d73' }
    case 'wind':
      return { color: '#39f' }
    default:
      return {}
  }
}

const WeatherDisplay = ({ condition, temperature, apparentTemperature }) => {
  const icon = weatherIconMap[condition] || faSun // Default to `faSun` if condition is not mapped

  return (
    <>
      <div className="d-none d-md-block">
        <small className="text-body text-opacity-75">
          Hamala <FontAwesomeIcon icon={icon} size="lg" style={iconStyle(condition)} />{' '}
          {temperature}&deg;C (Feels like {apparentTemperature}&deg;C)
        </small>
      </div>
      <div className="mx-auto d-md-none">
        <FontAwesomeIcon icon={icon} size="lg" style={iconStyle(condition)} />{' '}
        <small className="text-body text-opacity-75">{temperature}&deg;C</small>
      </div>
    </>
  )
}

WeatherDisplay.propTypes = {
  condition: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  apparentTemperature: PropTypes.number.isRequired,
}

export default WeatherDisplay
