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
    to: '/base',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'PM1.0',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'PM2.5',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'PM10',
        to: '/base/cards',
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
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Humidity',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Pressure',
        to: '/base/cards',
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
    to: '/charts',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Guide',
    to: '/charts',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Code',
    to: '/charts',
    icon: <CIcon icon={cilCode} customClassName="nav-icon" />,
  },
]

export default _nav
