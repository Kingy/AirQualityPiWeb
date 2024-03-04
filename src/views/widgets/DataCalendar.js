import React from 'react'
import PropTypes from 'prop-types'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import 'src/assets/css/DataCalendar.css'

const DataCalendar = ({ data, config }) => {
  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dayData = data.find((d) => {
        const dayDate = new Date(d.date)
        return (
          dayDate.getDate() === date.getDate() &&
          dayDate.getMonth() === date.getMonth() &&
          dayDate.getFullYear() === date.getFullYear()
        )
      })

      if (dayData && dayData.value !== undefined) {
        for (let i = 0; i < config.thresholds.length; i++) {
          if (dayData.value <= config.thresholds[i].maxValue) {
            return config.thresholds[i].className
          }
        }
      }
    }
  }

  return <Calendar tileClassName={getTileClassName} />
}

DataCalendar.propTypes = {
  data: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
}

export default DataCalendar
