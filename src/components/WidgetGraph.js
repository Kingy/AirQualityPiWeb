import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getStyle } from '@coreui/utils'
import { CChartLine, CChartBar } from '@coreui/react-chartjs'

const WidgetGraph = ({
  Data,
  BackGroundColor,
  Title,
  Chart = 'line',
  Fill = false,
  Smooth = false,
}) => {
  const [updateKey, setUpdateKey] = useState(0)
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: Title,
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-' + BackGroundColor),
        data: [78, 81, 80, 45, 34, 12, 40],
        fill: true,
      },
    ],
  })

  const [chartOptions, setChartOptions] = useState({
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
  })

  useEffect(() => {
    const fetchData = async () => {
      let recentDataPoints = []

      recentDataPoints = Data.slice(-10)

      const labels = recentDataPoints.map((point) =>
        new Date(point.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      )
      const dataPoints = recentDataPoints.map((point) => {
        const keys = Object.keys(point) // Get all keys of the object
        const secondKey = keys[1] // Get the second key
        return point[secondKey] // Return the value associated with the second key
      })

      const minDataPoint = Math.min(...dataPoints)
      const maxDataPoint = Math.max(...dataPoints)
      const buffer = (maxDataPoint - minDataPoint) * 0.1
      const min = minDataPoint - buffer
      const max = maxDataPoint + buffer

      setChartData((currentChartData) => ({
        ...currentChartData,
        labels: labels,
        datasets: [{ ...currentChartData.datasets[0], fill: Fill, data: dataPoints }],
      }))

      setChartOptions((prevOptions) => ({
        ...prevOptions,
        elements: {
          line: {
            // Keep tension the same for both, adjust as needed
            tension: 0.4,
            // Conditional setting for borderWidth based on Smooth
            borderWidth: Smooth ? undefined : 1,
          },
          point: {
            // Conditional setting for radius based on Smooth
            radius: Smooth ? 0 : 4,
            hitRadius: 10,
            hoverRadius: 4,
          },
        },
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
            // Assume min and max are defined elsewhere
            min,
            max,
            display: false,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      }))

      setUpdateKey((prevKey) => prevKey + 1)
    }

    fetchData()
  }, [Data, Fill, Smooth])

  return (
    <>
      {Chart === 'line' ? (
        <CChartLine
          key={updateKey}
          className="mt-3 mx-3"
          style={{ height: '70px' }}
          data={chartData}
          options={chartOptions}
        />
      ) : (
        <CChartBar
          key={updateKey}
          className="mt-3 mx-3"
          style={{ height: '70px' }}
          data={chartData}
          options={chartOptions}
        />
      )}
    </>
  )
}

WidgetGraph.propTypes = {
  Data: PropTypes.array.isRequired,
  BackGroundColor: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  Chart: PropTypes.string,
  Fill: PropTypes.bool,
  Smooth: PropTypes.bool,
}

export default WidgetGraph
