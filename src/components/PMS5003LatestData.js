import React from 'react'
import useFetchData from 'src/hooks/api'

const PMS5003LatestData = () => {
  const { data, loading, error } = useFetchData('pms5003/latest')

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      493 <span className="fs-6 fw-normal">(µg/m³)</span>
    </>
  )
}

export default PMS5003LatestData
