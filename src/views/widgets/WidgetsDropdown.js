import React from 'react'
import { CRow, CCol } from '@coreui/react'

import PMS5003PM10Widget from './PMS5003PM10Widget'
import BME680PressureWidget from './BME680PressureWidget'
import BME680TemperatureWidget from './BME680TemperatureWidget'
import BME680HumidityWidget from './BME680HumidityWidget'

const WidgetsDropdown = () => {
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <PMS5003PM10Widget />
      </CCol>
      <CCol sm={6} lg={3}>
        <BME680PressureWidget />
      </CCol>
      <CCol sm={6} lg={3}>
        <BME680TemperatureWidget />
      </CCol>
      <CCol sm={6} lg={3}>
        <BME680HumidityWidget />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
