import React from 'react'
import PropTypes from 'prop-types'

const PMS5003LatestData = ({ PM10Reading }) => {
  return (
    <>
      {PM10Reading} <span className="fs-6 fw-normal">(µg/m³)</span>
    </>
  )
}

PMS5003LatestData.propTypes = {
  PM10Reading: PropTypes.number.isRequired,
}

export default PMS5003LatestData
