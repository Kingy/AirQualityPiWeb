import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom } from '@coreui/icons'

const WindIndicator = () => {
  // const { data, loading, error } = useFetchData('weather/current'); // Adjust endpoint as needed

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  // // Assuming data contains windSpeed and windDirection in degrees
  // const { windSpeed, windDirection } = data;

  // Style to rotate the icon based on windDirection
  const iconStyle = {
    transform: `rotate(337deg)`,
    transition: 'transform 0.3s ease-out',
  }

  return (
    <div>
      Wind <CIcon icon={cilArrowBottom} size="sm" style={iconStyle} /> 16.3 km/h
    </div>
  )
}

export default WindIndicator
