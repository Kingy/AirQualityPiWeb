import React from 'react'
import { CWidgetStatsA } from '@coreui/react'
import WidgetLatestData from 'src/components/WidgetLatestData'
import WidgetGraph from 'src/components/WidgetGraph'
import useFetchData from 'src/hooks/api'

function getBackgroundColor(temp) {
  if (temp <= 15) return 'info'
  if (temp <= 28) return 'success'
  if (temp <= 35) return 'warning'
  return 'danger'
}

const BME680TemperatureWidget = () => {
  const { data, loading, error } = useFetchData('bme680/data?type=Temperature')

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error!</span>

  return (
    <CWidgetStatsA
      className="mb-4"
      color={getBackgroundColor(data.latestDataPoint[0].Temperature)}
      value={
        <>
          <WidgetLatestData Reading={data.latestDataPoint[0].Temperature} Measurement={'°C'} />
        </>
      }
      title="Temperature"
      chart={
        <WidgetGraph
          Data={data.last24HoursData}
          Title={'Temperature'}
          BackGroundColor={getBackgroundColor(data.latestDataPoint[0].Temperature)}
          Fill={true}
          Smooth={true}
        />
      }
    />
  )
}

export default BME680TemperatureWidget
