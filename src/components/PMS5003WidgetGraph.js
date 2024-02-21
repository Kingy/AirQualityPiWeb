import React, { useState, useEffect } from 'react'
import { getStyle } from '@coreui/utils'
import { CChartLine } from '@coreui/react-chartjs'
import useFetchData from 'src/hooks/api'

const PMS5003WidgetGraph = () => {
  const { data, loading, error } = useFetchData('pms5003/data?type=PM10')
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'PM10',
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-success'),
        data: [],
      },
    ],
  })

  useEffect(() => {
    // Fetch your data and then set chart data
    const fetchData = async () => {
      // Simulating fetching data
      let recentDataPoints = []

      if (!loading) {
        recentDataPoints = data.last24HoursData.slice(-10)
      }
      const labels = recentDataPoints.map((point) =>
        new Date(point.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      )
      const dataPoints = recentDataPoints.map((point) => point.PM10)

      setChartData({
        ...chartData,
        labels: labels,
        datasets: [{ ...chartData.datasets[0], data: dataPoints }],
      })
    }

    fetchData()
  }, [data])

  console.log(chartData)

  return (
    <CChartLine
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
            max: 89,
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

export default PMS5003WidgetGraph
