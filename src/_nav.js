import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilChartLine, cilBook, cilCode, cilInfo, cilBarChart } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Charts',
  },
  {
    component: CNavGroup,
    name: 'Air Quality',
    to: '/pm',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'PM1.0',
        to: '/pm/1',
      },
      {
        component: CNavItem,
        name: 'PM2.5',
        to: '/pm/25',
      },
      {
        component: CNavItem,
        name: 'PM10',
        to: '/pm/10',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Conditions',
    to: '/base',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Temperature',
        to: '/conditions/temperature',
      },
      {
        component: CNavItem,
        name: 'Humidity',
        to: '/conditions/humidity',
      },
      {
        component: CNavItem,
        name: 'Pressure',
        to: '/conditions/pressure',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'About',
  },
  {
    component: CNavItem,
    name: 'Information',
    to: '/information',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Guide',
    to: '/guide',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Code',
    to: '/code',
    icon: <CIcon icon={cilCode} customClassName="nav-icon" />,
  },
]

export default _nav
