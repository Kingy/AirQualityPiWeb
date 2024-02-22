import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getStyle } from '@coreui/utils'
import { CChartLine } from '@coreui/react-chartjs'

const PMS5003WidgetGraph = ({ PM10Data, BackGroundColor }) => {
  const [updateKey, setUpdateKey] = useState(0)
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'PM10',
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-' + BackGroundColor),
        data: [],
      },
    ],
  })

  useEffect(() => {
    const fetchData = async () => {
      let recentDataPoints = []

      recentDataPoints = PM10Data.slice(-10)

      const labels = recentDataPoints.map((point) =>
        new Date(point.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      )
      const dataPoints = recentDataPoints.map((point) => point.PM10)

      setChartData({
        ...chartData,
        labels: labels,
        datasets: [{ ...chartData.datasets[0], data: dataPoints }],
      })
      setUpdateKey((prevKey) => prevKey + 1)
    }

    fetchData()
  }, [])

  return (
    <CChartLine
      key={updateKey}
      className="mt-3 mx-3"
      style={{ height: '70px' }}
      data={chartData}
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            min: 30,
            max: 350,
            display: false,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },
        elements: {
          line: {
            borderWidth: 1,
            tension: 0.4,
          },
          point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4,
          },
        },
      }}
    />
  )
}

PMS5003WidgetGraph.propTypes = {
  PM10Data: PropTypes.array.isRequired,
  BackGroundColor: PropTypes.string.isRequired,
}

export default PMS5003WidgetGraph
