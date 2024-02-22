import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import PMS5003PM2_5Chart from '../../components/PMS5003PM2_5Chart'
import PMS5003AllPMData from 'src/components/PMS5003AllPMData'
import PM5003PMChart from 'src/components/PM5003PMChart'

const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown />
      <CCard className="mb-4">
        <PM5003PMChart />
      </CCard>

      <CRow>
        <CCol xl={8} lg={7}>
          <CCard className="mb-4">
            <PMS5003AllPMData />
          </CCard>
        </CCol>
        <CCol xl={4} lg={5}>
          <CCard className="mb-4">
            <CCardHeader>PM2.5 Reading</CCardHeader>
            <CCardBody>
              <PMS5003PM2_5Chart />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
