import React from 'react'
import { useWeather } from 'src/context/WeatherContext'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { logo } from 'src/assets/brand/logo'
import WindIndicator from './WindDirection'
import WeatherDisplay from './WeatherDisplay'

function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000) // Convert timestamp to milliseconds
  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  })

  let formattedDate = formatter.format(date)

  // Add ordinal suffix to day
  const day = date.getUTCDate()
  const suffix = ['th', 'st', 'nd', 'rd'][
    day % 10 > 3 ? 0 : (((day % 100) - (day % 10) != 10) * day) % 10
  ]

  return formattedDate.replace(/(\d+)(th)/, `${day}${suffix}`)
}

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const { data, loading, error } = useWeather()

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        {loading && (
          <CHeaderNav className="d-none d-md-flex ms-auto">
            <CNavItem>
              <CSpinner color="primary" variant="grow" />
            </CNavItem>
          </CHeaderNav>
        )}
        {data && (
          <CHeaderNav className="d-none d-md-flex ms-auto">
            <CNavItem>
              <WeatherDisplay
                condition={data.currently.icon}
                temperature={data.currently.temperature}
                apparentTemperature={data.currently.apparentTemperature}
              />
            </CNavItem>
            <li className="nav-item py-1">
              <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
            </li>
            <CNavItem>
              <WindIndicator
                direction={data.currently.windBearing}
                speed={data.currently.windSpeed}
              />
            </CNavItem>
            <li className="nav-item py-1">
              <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
            </li>
            <CNavItem>
              <small className="text-body text-opacity-75">
                Humidity {data.currently.humidity * 100}%
              </small>
            </CNavItem>
          </CHeaderNav>
        )}
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
        {loading && (
          <CHeaderNav className="d-none d-md-flex ms-auto">
            <CNavItem>
              <CSpinner color="primary" variant="grow" />
            </CNavItem>
          </CHeaderNav>
        )}
        {data && (
          <>
            <CHeaderNav className="d-none d-md-flex ms-auto">
              <CNavItem>
                <small className="text-body text-opacity-75">
                  Last updated: {formatTimestamp(data.currently.time)}
                </small>
              </CNavItem>
            </CHeaderNav>
            <CHeaderNav className="ms-auto d-md-none">
              <CNavItem>
                <WeatherDisplay
                  condition={data.currently.icon}
                  temperature={data.currently.temperature}
                  apparentTemperature={data.currently.apparentTemperature}
                />
              </CNavItem>
              <li className="nav-item py-1">
                <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
              </li>
              <CNavItem>
                <WindIndicator
                  direction={data.currently.windBearing}
                  speed={data.currently.windSpeed}
                />
              </CNavItem>
              <li className="nav-item py-1">
                <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
              </li>
              <CNavItem>
                <small className="text-body text-opacity-75">
                  {data.currently.humidity * 100}%
                </small>
              </CNavItem>
            </CHeaderNav>
          </>
        )}
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
