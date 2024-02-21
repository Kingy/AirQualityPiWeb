import React, { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const WeatherContext = createContext()

export const useWeather = () => useContext(WeatherContext)

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({ loading: true, error: null, data: null })

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY
      const longitude = process.env.REACT_APP_LOCATION_LONGITUDE
      const latitude = process.env.REACT_APP_LOCATION_LATITUDE
      const now = new Date()
      const cachedData = localStorage.getItem('weatherData')
      const cacheTime = localStorage.getItem('weatherDataTimestamp')

      if (cachedData && cacheTime && now - new Date(cacheTime) < 5 * 60 * 1000) {
        setWeatherData({ loading: false, error: null, data: JSON.parse(cachedData) })
        return
      }

      try {
        const response = await fetch(
          `https://api.pirateweather.net/forecast/${apiKey}/${longitude},${latitude}?units=ca`,
        )
        if (!response.ok) throw new Error('Weather data fetching failed')
        const data = await response.json()
        localStorage.setItem('weatherData', JSON.stringify(data))
        localStorage.setItem('weatherDataTimestamp', now.toISOString())
        setWeatherData({ loading: false, error: null, data })
      } catch (error) {
        setWeatherData({ loading: false, error, data: null })
      }
    }

    fetchWeatherData()
  }, [])

  return <WeatherContext.Provider value={weatherData}>{children}</WeatherContext.Provider>
}

WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
