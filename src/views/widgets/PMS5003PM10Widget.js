import React from 'react'
import { CWidgetStatsA } from '@coreui/react'
import PMS5003LatestData from 'src/components/PMS5003LatestData'
import PMS5003WidgetGraph from 'src/components/PMS5003WidgetGraph'
import useFetchData from 'src/hooks/api'

function getBackgroundColor(pm10) {
  if (pm10 <= 50) return 'success'
  if (pm10 <= 100) return 'success'
  if (pm10 <= 150) return 'warning'
  if (pm10 <= 200) return 'danger'
  if (pm10 <= 300) return 'danger'
  return 'danger' // for pm2_5 > 300
}

const PMS5003PM10Widget = () => {
  const { data, loading, error } = useFetchData('pms5003/data?type=PM10')

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error!</span>

  return (
    <CWidgetStatsA
      className="mb-4"
      color={getBackgroundColor(data.latestDataPoint[0].PM10)}
      value={
        <>
          <PMS5003LatestData PM10Reading={data.latestDataPoint[0].PM10} />
        </>
      }
      title="PM 10"
      chart={
        <PMS5003WidgetGraph
          PM10Data={data.last24HoursData}
          BackGroundColor={getBackgroundColor(data.latestDataPoint[0].PM10)}
        />
      }
    />
  )
}

export default PMS5003PM10Widget
