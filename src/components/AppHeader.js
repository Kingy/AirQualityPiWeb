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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu, cilSun } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { logo } from 'src/assets/brand/logo'
import WindIndicator from './WindDirection'
import WeatherDisplay from './WeatherDisplay'

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
              <small className="text-body text-opacity-75">Loading...</small>
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
        <CHeaderNav className="d-none d-md-flex ms-auto">
          <CNavItem>
            <small className="text-body text-opacity-75">
              Last updated: 21st February 2024 13:05
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
            <small className="text-body text-opacity-75">62{data.currently.humidity * 100}%</small>
          </CNavItem>
          <CNavItem>
            <small className="text-body text-opacity-75">&nbsp;@ 21/02 13:05</small>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
