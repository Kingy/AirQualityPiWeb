import React from 'react'
import { CButton, CButtonGroup, CCardBody, CCol, CRow, CSpinner } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import useFetchData from 'src/hooks/api'

const PM5003PMChart = () => {
  const { data, loading, error } = useFetchData('pms5003/last24hours')

  if (loading) return <CSpinner color="primary" variant="grow" />
  if (error) return <span>Error!</span>

  const sortedData = data.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

  const chartData = {
    labels: sortedData.map((item) =>
      new Date(item.createdAt).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      }),
    ),
    datasets: [
      {
        label: 'PM1.0',
        data: sortedData.map((item) => item.PM1_0),
        borderColor: 'rgb(255, 99, 132)', // Example color
        backgroundColor: 'rgba(255, 99, 132, 0.5)', // Example color
      },
      {
        label: 'PM2.5',
        data: sortedData.map((item) => item.PM2_5),
        borderColor: 'rgb(54, 162, 235)', // Example color
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Example color
      },
      {
        label: 'PM10',
        data: sortedData.map((item) => item.PM10),
        borderColor: 'rgb(75, 192, 192)', // Example color
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Example color
      },
    ],
  }

  return (
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
        style={{ height: '320px', marginTop: '40px' }}
        data={chartData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 18,
              },
              grid: {
                drawOnChartArea: false,
              },
            },
            y: {
              ticks: {
                beginAtZero: true,
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
  )
}

export default PM5003PMChart
