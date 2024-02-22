import React from 'react'
import { CWidgetStatsA } from '@coreui/react'
import WidgetLatestData from 'src/components/WidgetLatestData'
import WidgetGraph from 'src/components/WidgetGraph'
import useFetchData from 'src/hooks/api'

function getBackgroundColor(humidity) {
  if (humidity <= 990) return 'primary'
  if (humidity <= 1024) return 'info'
  return 'primary'
}

const BME680PressureWidget = () => {
  const { data, loading, error } = useFetchData('bme680/data?type=Pressure')

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error!</span>

  return (
    <CWidgetStatsA
      className="mb-4"
      color={getBackgroundColor(data.latestDataPoint[0].Pressure)}
      value={
        <>
          <WidgetLatestData Reading={data.latestDataPoint[0].Pressure} Measurement={'hPa'} />
        </>
      }
      title="Pressure"
      chart={
        <WidgetGraph
          Data={data.last24HoursData}
          Title={'Pressure'}
          BackGroundColor={getBackgroundColor(data.latestDataPoint[0].Pressure)}
        />
      }
    />
  )
}

export default BME680PressureWidget
