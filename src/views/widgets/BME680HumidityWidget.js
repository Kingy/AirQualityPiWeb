import React from 'react'
import { CWidgetStatsA } from '@coreui/react'
import WidgetLatestData from 'src/components/WidgetLatestData'
import WidgetGraph from 'src/components/WidgetGraph'
import useFetchData from 'src/hooks/api'

const BME680HumidityWidget = () => {
  const { data, loading, error } = useFetchData('bme680/data?type=Humidity')

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error!</span>

  console.log(data.last24HoursData)

  return (
    <CWidgetStatsA
      className="mb-4"
      color="info"
      value={
        <>
          <WidgetLatestData Reading={data.latestDataPoint[0].Humidity} Measurement={'hPa'} />
        </>
      }
      title="Pressure"
      chart={<WidgetGraph Data={data.last24HoursData} BackGroundColor={'info'} />}
    />
  )
}

export default BME680HumidityWidget
