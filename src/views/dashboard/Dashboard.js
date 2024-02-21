import React from 'react'

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine, CChartDoughnut } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'

import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const tableExample = [
    {
      data: {
        date: '09/07/2023, 09:40:11',
        pm1_0: '157',
        pm2_5: '281',
        pm10: '298',
      },
    },
    {
      data: {
        date: '09/07/2023, 09:35:11',
        pm1_0: '157',
        pm2_5: '273',
        pm10: '304',
      },
    },
    {
      data: {
        date: '09/07/2023, 09:30:10',
        pm1_0: '162',
        pm2_5: '195',
        pm10: '313',
      },
    },
    {
      data: {
        date: '09/07/2023, 09:25:11',
        pm1_0: '164',
        pm2_5: '294',
        pm10: '315',
      },
    },
  ]

  var dnOptions = {
    tooltips: {
      backgroundColor: 'rgb(255,255,255)',
      bodyFontColor: '#858796',
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false,
    },
    cutout: '80%',
  }

  var dnPlugins = [
    {
      id: 'text',
      beforeDraw: function (chart, a, b) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx

        ctx.restore()
        var fontSize = (height / 120).toFixed(2)
        ctx.font = fontSize + 'em sans-serif'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = '#5a5c69'

        var text = '25µg/m³',
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 1.8

        ctx.fillText(text, textX, textY)
        ctx.save()
      },
    },
  ]

  return (
    <>
      <WidgetsDropdown />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Particle Matter
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                  fill: true,
                },
                {
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                },
                {
                  label: 'My Third dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: [65, 65, 65, 65, 65, 65, 65],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
      </CCard>

      <CRow>
        <CCol xl={8} lg={7}>
          <CCard className="mb-4">
            <CCardHeader>All PM Data</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">PM1.0</CTableHeaderCell>
                    <CTableHeaderCell>PM2.5</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">PM10</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.data.date}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.data.pm1_0}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.data.pm2_5}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.data.pm10}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xl={4} lg={5}>
          <CCard className="mb-4">
            <CCardHeader>PM2.5 Reading</CCardHeader>
            <CCardBody>
              <CChartDoughnut
                data={{
                  labels: ['PM2.5'],
                  datasets: [
                    {
                      backgroundColor: ['#e74a3b'],
                      hoverBorderColor: 'rgba(234, 236, 244, 1)',
                      data: [100],
                    },
                  ],
                }}
                options={dnOptions}
                plugins={dnPlugins}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
