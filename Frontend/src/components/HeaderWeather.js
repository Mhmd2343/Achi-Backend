import React, { useState, useEffect, useRef } from 'react'

const HeaderWeather = () => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const abortControllerRef = useRef(null)

  // Map weather codes to icons and descriptions
  const getWeatherIcon = (code) => {
    // WMO Weather interpretation codes (WW)
    // Clear sky: 0
    // Mainly clear: 1
    // Partly cloudy: 2
    // Overcast: 3
    // Fog: 45, 48
    // Drizzle: 51, 53, 55
    // Freezing drizzle: 56, 57
    // Rain: 61, 63, 65
    // Freezing rain: 66, 67
    // Snow: 71, 73, 75
    // Snow grains: 77
    // Rain showers: 80, 81, 82
    // Snow showers: 85, 86
    // Thunderstorm: 95, 96, 99

    if (code === 0) return { icon: '☀️', text: 'Clear' }
    if (code === 1) return { icon: '🌤️', text: 'Mainly clear' }
    if (code === 2) return { icon: '⛅', text: 'Partly cloudy' }
    if (code === 3) return { icon: '☁️', text: 'Overcast' }
    if ([45, 48].includes(code)) return { icon: '🌫️', text: 'Foggy' }
    if ([51, 53, 55].includes(code)) return { icon: '🌦️', text: 'Drizzle' }
    if ([56, 57].includes(code)) return { icon: '🌨️', text: 'Freezing drizzle' }
    if ([61, 63, 65].includes(code)) return { icon: '🌧️', text: 'Rain' }
    if ([66, 67].includes(code)) return { icon: '🌨️', text: 'Freezing rain' }
    if ([71, 73, 75].includes(code)) return { icon: '❄️', text: 'Snow' }
    if (code === 77) return { icon: '🌨️', text: 'Snow grains' }
    if ([80, 81, 82].includes(code)) return { icon: '🌦️', text: 'Showers' }
    if ([85, 86].includes(code)) return { icon: '🌨️', text: 'Snow showers' }
    if ([95, 96, 99].includes(code)) return { icon: '⛈️', text: 'Thunderstorm' }
    
    return { icon: '🌤️', text: 'Unknown' }
  }

  const fetchWeather = async () => {
    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()

    try {
      setLoading(true)
      setError(false)

      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=33.8938&longitude=35.5018&current=temperature_2m,weather_code&timezone=auto',
        { signal: abortControllerRef.current.signal }
      )

      if (!response.ok) {
        throw new Error('Weather API error')
      }

      const data = await response.json()
      
      if (data.current) {
        const weatherInfo = getWeatherIcon(data.current.weather_code)
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          code: data.current.weather_code,
          icon: weatherInfo.icon,
          condition: weatherInfo.text
        })
      } else {
        throw new Error('Invalid weather data')
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Weather fetch error:', err)
        setError(true)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Fetch on mount
    fetchWeather()

    // Refresh every 10 minutes
    const interval = setInterval(() => {
      fetchWeather()
    }, 10 * 60 * 1000) // 10 minutes

    return () => {
      clearInterval(interval)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  // Build aria-label for accessibility
  const ariaLabel = weather
    ? `Current weather in Lebanon: ${weather.temperature} degrees, ${weather.condition}`
    : 'Weather information unavailable'

  return (
    <div
      className="flex items-center gap-[8px] ltr:ml-[16px] rtl:mr-[16px] text-white"
      aria-label={ariaLabel}
    >
      {loading && !weather ? (
        <span className="text-[12px] 2xl:text-[14px] font-saira">—°C</span>
      ) : error && !weather ? (
        <span className="text-[12px] 2xl:text-[14px] font-saira">—°C</span>
      ) : weather ? (
        <>
          <span className="text-[18px] 2xl:text-[20px]" role="img" aria-hidden="true">
            {weather.icon}
          </span>
          <span className="text-[12px] 2xl:text-[14px] font-saira font-[500] whitespace-nowrap">
            {weather.temperature}°C
          </span>
          <span className="hidden lg:inline text-[11px] 2xl:text-[13px] font-saira font-[400] opacity-90">
            Lebanon
          </span>
        </>
      ) : (
        <span className="text-[12px] 2xl:text-[14px] font-saira">—°C</span>
      )}
    </div>
  )
}

export default HeaderWeather

