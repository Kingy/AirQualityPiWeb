import React from 'react'
import PropTypes from 'prop-types'

const WidgetLatestData = ({ Reading, Measurement }) => {
  return (
    <>
      {Reading} <span className="fs-6 fw-normal">({Measurement})</span>
    </>
  )
}

WidgetLatestData.propTypes = {
  Reading: PropTypes.number.isRequired,
  Measurement: PropTypes.string.isRequired,
}

export default WidgetLatestData
