import React, { useState, useEffect } from 'react'
import { CChartDoughnut } from '@coreui/react-chartjs'
import { CSpinner } from '@coreui/react'
import useFetchData from 'src/hooks/api'

function getBackgroundColor(pm2_5) {
  if (pm2_5 <= 50) return '#198754'
  if (pm2_5 <= 100) return '#f9b115'
  if (pm2_5 <= 150) return '#e55353'
  if (pm2_5 <= 200) return '#dc3545'
  if (pm2_5 <= 300) return '#6f42c1'
  return '#6610f2' // for pm2_5 > 300
}

const PMS5003PM2_5Chart = () => {
  const { data, loading, error } = useFetchData('pms5003/data?type=PM2_5')

  const [pm2_5, setPm2_5] = useState(0)
  const [updateKey, setUpdateKey] = useState(0)

  var dnOptions = {
    tooltips: {
      backgroundColor: 'rgb(255,255,255)',
      bodyFontColor: '#858796',
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false,
    },
    cutout: '80%',
  }

  const generateChartPlugins = (currentPm2_5) => [
    {
      id: 'text',
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx

        ctx.restore()
        var fontSize = (height / 120).toFixed(2)
        ctx.font = fontSize + 'em sans-serif'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = '#5a5c69'

        var text = currentPm2_5 + 'µg/m³',
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 1.8

        ctx.fillText(text, textX, textY)
        ctx.save()
      },
    },
  ]

  useEffect(() => {
    const setData = async () => {
      if (!loading) {
        const newPm2_5 = data.latestDataPoint[0].PM2_5 // Assume this is how you get your new pm2_5
        setPm2_5(newPm2_5)
        setUpdateKey((prevKey) => prevKey + 1)

        setChartData((currentChartData) => ({
          ...currentChartData,
          datasets: [
            { ...currentChartData.datasets[0], backgroundColor: [getBackgroundColor(newPm2_5)] },
          ],
        }))
      }
    }

    setData()
  }, [data, loading])

  const [chartData, setChartData] = useState({
    labels: ['PM2.5'],
    datasets: [
      {
        backgroundColor: ['#fff'],
        hoverBorderColor: 'rgba(234, 236, 244, 1)',
        data: [100],
      },
    ],
  })

  if (loading) return <CSpinner color="primary" variant="grow" />
  if (error) return <span>Error!</span>

  return (
    <CChartDoughnut
      key={updateKey}
      data={chartData}
      options={dnOptions}
      plugins={generateChartPlugins(pm2_5)}
    />
  )
}

export default PMS5003PM2_5Chart
