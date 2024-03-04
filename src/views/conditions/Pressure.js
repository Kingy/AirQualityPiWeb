import React from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow, CWidgetStatsF } from '@coreui/react'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faGaugeHigh, faGaugeMed } from '@fortawesome/free-solid-svg-icons'
import BME680AllData from 'src/components/BME680AllData'
import DataCalendar from '../widgets/DataCalendar'

const pressureConfig = {
  thresholds: [
    { maxValue: 980, className: 'red' }, // Cold
    { maxValue: 1005, className: 'yellow' }, // Moderate
    { maxValue: 1018, className: 'green' },
    { maxValue: 1022, className: 'yellow' }, // Warm
    { maxValue: Infinity, className: 'red' }, // Hot
  ],
}

const pressureData = [
  { date: '2024-02-26', value: 1015.222 },
  { date: '2024-02-27', value: 1015.222 },
  { date: '2024-02-28', value: 1018.222 },
  { date: '2024-02-29', value: 1015.222 },
  { date: '2024-03-01', value: 1019.222 },
  { date: '2024-03-02', value: 1015.222 },
  { date: '2024-03-03', value: 1025.222 },
  { date: '2024-03-04', value: 1015.222 },
  // More data
]

const Pressure = () => {
  return (
    <>
      <CRow>
        <CCol xs={4}>
          <CWidgetStatsF
            className="mb-3"
            color="success"
            padding={false}
            icon={<FontAwesomeIcon icon={faGauge} style={{ color: 'success' }} size="lg" />}
            title="Current Pressure"
            value="1011.78hPa"
          />
        </CCol>
        <CCol xs={4}>
          <CWidgetStatsF
            className="mb-3"
            color="primary"
            padding={false}
            icon={<FontAwesomeIcon icon={faGaugeMed} style={{ color: 'success' }} size="lg" />}
            title="Daily Low"
            value="1011.78hPa"
          />
        </CCol>
        <CCol xs={4}>
          <CWidgetStatsF
            className="mb-3"
            color="warning"
            padding={false}
            icon={<FontAwesomeIcon icon={faGaugeHigh} style={{ color: 'success' }} size="lg" />}
            title="Daily High"
            value="1015.222hPa"
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>7 day Pressure</CCardHeader>
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
            <BME680AllData Sensor="Pressure" />
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>Monthly Averages</CCardHeader>
            <CCardBody>
              <DataCalendar data={pressureData} config={pressureConfig} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Pressure
