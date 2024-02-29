import React from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow, CWidgetStatsF } from '@coreui/react'
import { CChartBar, CChartLine, CChartPie } from '@coreui/react-chartjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTemperatureFull,
  faTemperatureLow,
  faTemperatureHigh,
} from '@fortawesome/free-solid-svg-icons'
import BME680AllData from 'src/components/BME680AllData'

const Temperature = () => {
  return (
    <>
      <CRow>
        <CCol xs={4}>
          <CWidgetStatsF
            className="mb-3"
            color="success"
            padding={false}
            icon={
              <FontAwesomeIcon icon={faTemperatureFull} style={{ color: 'success' }} size="lg" />
            }
            title="Current Temperature"
            value="25.5°C"
          />
        </CCol>
        <CCol xs={4}>
          <CWidgetStatsF
            className="mb-3"
            color="primary"
            padding={false}
            icon={
              <FontAwesomeIcon icon={faTemperatureLow} style={{ color: 'success' }} size="lg" />
            }
            title="Daily Low"
            value="18.6°C"
          />
        </CCol>
        <CCol xs={4}>
          <CWidgetStatsF
            className="mb-3"
            color="warning"
            padding={false}
            icon={
              <FontAwesomeIcon icon={faTemperatureHigh} style={{ color: 'success' }} size="lg" />
            }
            title="Daily High"
            value="29.3°C"
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>7 day Temperature</CCardHeader>
            <CCardBody>
              <CChartBar
                data={{
                  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                  datasets: [
                    {
                      label: 'High',
                      backgroundColor: '#f87979',
                      data: [27.7, 33.1, 30.2, 28.9, 28.5, 30.5, 28.1, 29.4, 34.4],
                    },
                    {
                      label: 'Low',
                      backgroundColor: '#83c2f2',
                      data: [13.2, 11.8, 14.9, 13.2, 12.3, 14.7, 13.6, 14.0, 15.1],
                    },
                  ],
                }}
                labels="months"
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>Monthly Averages</CCardHeader>
            <CCardBody>
              <CChartLine
                data={{
                  labels: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                  datasets: [
                    {
                      label: 'High',
                      borderColor: '#f87979',
                      backgroundColor: '#f87979',
                      data: [24, 26, 27, 30, 34, 37, 41, 38, 36, 31, 27, 25],
                    },
                    {
                      label: 'Low',
                      borderColor: '#83c2f2',
                      backgroundColor: '#83c2f2',
                      data: [11, 14, 16, 19, 26, 29, 33, 31, 28, 23, 19, 13],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4">
            <BME680AllData Sensor="Temperature" />
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>Pie Chart</CCardHeader>
            <CCardBody>
              <CChartPie
                data={{
                  labels: ['Red', 'Green', 'Yellow'],
                  datasets: [
                    {
                      data: [300, 50, 100],
                      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Temperature
