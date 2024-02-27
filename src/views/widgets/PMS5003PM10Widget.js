import React from 'react'
import { CWidgetStatsA, CSpinner } from '@coreui/react'
import WidgetLatestData from 'src/components/WidgetLatestData'
import WidgetGraph from 'src/components/WidgetGraph'
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

  if (loading) return <CSpinner color="primary" variant="grow" />
  if (error) return <span>Error!</span>

  return (
    <CWidgetStatsA
      className="mb-4"
      color={getBackgroundColor(data.latestDataPoint[0].PM10)}
      value={
        <>
          <WidgetLatestData Reading={data.latestDataPoint[0].PM10} Measurement={'µg/m³'} />
        </>
      }
      title="PM 10"
      chart={
        <WidgetGraph
          Data={data.last24HoursData}
          Title={'PM10'}
          BackGroundColor={getBackgroundColor(data.latestDataPoint[0].PM10)}
        />
      }
    />
  )
}

export default PMS5003PM10Widget
