import React, { useState, useEffect, useRef } from 'react'

const CountryWeather = ({ country, coordinates }) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const abortControllerRef = useRef(null)

  // Map weather codes to icons
  const getWeatherIcon = (code) => {
    if (code === 0) return '☀️'
    if (code === 1) return '🌤️'
    if (code === 2) return '⛅'
    if (code === 3) return '☁️'
    if ([45, 48].includes(code)) return '🌫️'
    if ([51, 53, 55].includes(code)) return '🌦️'
    if ([56, 57].includes(code)) return '🌨️'
    if ([61, 63, 65].includes(code)) return '🌧️'
    if ([66, 67].includes(code)) return '🌨️'
    if ([71, 73, 75].includes(code)) return '❄️'
    if (code === 77) return '🌨️'
    if ([80, 81, 82].includes(code)) return '🌦️'
    if ([85, 86].includes(code)) return '🌨️'
    if ([95, 96, 99].includes(code)) return '⛈️'
    return '🌤️'
  }

  const fetchWeather = async () => {
    if (!coordinates) return

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()

    try {
      setLoading(true)
      setError(false)

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&current=temperature_2m,weather_code&timezone=auto`,
        { signal: abortControllerRef.current.signal }
      )

      if (!response.ok) {
        throw new Error('Weather API error')
      }

      const data = await response.json()
      
      if (data.current) {
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          icon: getWeatherIcon(data.current.weather_code)
        })
      } else {
        throw new Error('Invalid weather data')
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(true)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (coordinates) {
      fetchWeather()

      const interval = setInterval(() => {
        fetchWeather()
      }, 10 * 60 * 1000) // 10 minutes

      return () => {
        clearInterval(interval)
        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
        }
      }
    }
  }, [coordinates])

  if (!coordinates) return null

  return (
    <span className="inline-flex items-center gap-[4px] text-white">
      {loading && !weather ? (
        <span className="text-[14px] font-saira font-[500] leading-[1]">—°C</span>
      ) : error && !weather ? (
        <span className="text-[14px] font-saira font-[500] leading-[1]">—°C</span>
      ) : weather ? (
        <>
          <span className="text-[18px] leading-[1]" role="img" aria-hidden="true">
            {weather.icon}
          </span>
          <span className="text-[14px] font-saira font-[500] leading-[1] whitespace-nowrap inline-block">
            {weather.temperature}°C
          </span>
        </>
      ) : (
        <span className="text-[14px] font-saira font-[500] leading-[1]">—°C</span>
      )}
    </span>
  )
}

export default CountryWeather

