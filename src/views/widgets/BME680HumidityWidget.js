import React from 'react'
import { CWidgetStatsA, CSpinner } from '@coreui/react'
import WidgetLatestData from 'src/components/WidgetLatestData'
import WidgetGraph from 'src/components/WidgetGraph'
import useFetchData from 'src/hooks/api'

function getBackgroundColor(humidity) {
  if (humidity <= 20) return 'info'
  if (humidity <= 50) return 'success'
  if (humidity <= 75) return 'warning'
  return 'danger' // for pm2_5 > 300
}

const BME680HumidityWidget = () => {
  const { data, loading, error } = useFetchData('bme680/data?type=Humidity')

  if (loading) return <CSpinner color="primary" variant="grow" />
  if (error) return <span>Error!</span>

  return (
    <CWidgetStatsA
      className="mb-4"
      color={getBackgroundColor(data.latestDataPoint[0].Humidity)}
      value={
        <>
          <WidgetLatestData Reading={data.latestDataPoint[0].Humidity} Measurement={'%'} />
        </>
      }
      title="Humidity"
      chart={
        <WidgetGraph
          Data={data.last24HoursData}
          Title={'Humidity'}
          BackGroundColor={getBackgroundColor(data.latestDataPoint[0].Humidity)}
          Chart={'bar'}
        />
      }
    />
  )
}

export default BME680HumidityWidget
