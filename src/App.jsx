import { useCallback, useEffect, useState } from 'react'
import AlertsSection from './components/AlertsSection'
import AirQuality from './components/AirQuality'
import FavoriteCities from './components/FavoriteCities'
import Forecast from './components/Forecast'
import HourlyForecast from './components/HourlyForecast'
import Loader from './components/Loader'
import MoonCard from './components/MoonCard'
import SearchBar from './components/SearchBar'
import StatCard from './components/StatCard'
import SunCard from './components/SunCard'
import ThemeToggle from './components/ThemeToggle'
import WeatherMap from './components/WeatherMap'
import WeatherCard from './components/WeatherCard'
import './App.css'

const API_KEY = '7abb4f99a5ab4e97899130247262804'
const FORECAST_URL = 'https://api.weatherapi.com/v1/forecast.json'
const SEARCH_URL = 'https://api.weatherapi.com/v1/search.json'
const RECENT_KEY = 'weatherpulse_recent_searches'
const FAVORITES_KEY = 'weatherpulse_favorite_cities'
const THEME_KEY = 'weatherpulse_theme'
const DEFAULT_CITY = 'Thrissur'

async function requestWeather(searchTerm, signal) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchTerm,
    days: '3',
    aqi: 'yes',
    alerts: 'yes',
  })
  const response = await fetch(`${FORECAST_URL}?${params.toString()}`, { signal })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.error?.message || 'City not found')
  }

  return data
}

function getUvLabel(value) {
  if (value >= 6) return 'High'
  if (value >= 3) return 'Moderate'
  return 'Low'
}

function getNextHours(weather) {
  const localEpoch = weather.location.localtime_epoch
  return weather.forecast.forecastday
    .flatMap((day) => day.hour)
    .filter((hour) => hour.time_epoch >= localEpoch)
    .slice(0, 24)
}

function App() {
  const [weather, setWeather] = useState(null)
  const [query, setQuery] = useState(DEFAULT_CITY)
  const [suggestions, setSuggestions] = useState([])
  const [recentSearches, setRecentSearches] = useState(() =>
    JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'),
  )
  const [favoriteCities, setFavoriteCities] = useState(() =>
    JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]'),
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'dark')

  const saveRecentSearch = useCallback((locationName) => {
    setRecentSearches((current) => {
      const updated = [
        locationName,
        ...current.filter((item) => item.toLowerCase() !== locationName.toLowerCase()),
      ].slice(0, 6)

      localStorage.setItem(RECENT_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const fetchWeather = useCallback(
    async (query) => {
      const searchTerm = query.trim()

      if (!searchTerm) return

      setLoading(true)
      setError('')
      setSuggestions([])

      try {
        const data = await requestWeather(searchTerm)
        setWeather(data)
        setQuery(data.location.name)
        saveRecentSearch(data.location.name)
      } catch (fetchError) {
        setError(fetchError.message || 'Something went wrong. Please try another city.')
      } finally {
        setLoading(false)
      }
    },
    [saveRecentSearch],
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    const controller = new AbortController()

    async function loadInitialWeather(searchTerm) {
      try {
        const data = await requestWeather(searchTerm, controller.signal)
        setWeather(data)
        setQuery(data.location.name)
        saveRecentSearch(data.location.name)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load weather data.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    if (!navigator.geolocation) {
      loadInitialWeather(DEFAULT_CITY)
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude},${position.coords.longitude}`
          loadInitialWeather(coords)
        },
        () => {
          loadInitialWeather(DEFAULT_CITY)
        },
        { enableHighAccuracy: false, maximumAge: 600000, timeout: 6000 },
      )
    }

    return () => {
      controller.abort()
    }
  }, [saveRecentSearch])

  useEffect(() => {
    if (query.trim().length < 2) {
      return undefined
    }

    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ key: API_KEY, q: query })
        const response = await fetch(`${SEARCH_URL}?${params.toString()}`, {
          signal: controller.signal,
        })
        const data = await response.json()

        if (response.ok) {
          setSuggestions(data.slice(0, 5))
        }
      } catch (suggestionError) {
        if (suggestionError.name !== 'AbortError') {
          setSuggestions([])
        }
      }
    }, 280)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  const handleSubmit = (query) => {
    fetchWeather(query)
  }

  const handleQueryChange = (nextQuery) => {
    setQuery(nextQuery)

    if (nextQuery.trim().length < 2) {
      setSuggestions([])
    }
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  const toggleFavoriteCity = () => {
    if (!weather) return

    const cityName = weather.location.name

    setFavoriteCities((current) => {
      const exists = current.some((city) => city.toLowerCase() === cityName.toLowerCase())
      const updated = exists
        ? current.filter((city) => city.toLowerCase() !== cityName.toLowerCase())
        : [cityName, ...current].slice(0, 8)

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const isFavorite =
    weather &&
    favoriteCities.some((city) => city.toLowerCase() === weather.location.name.toLowerCase())

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <div>
          <p className="eyebrow">WeatherPulse</p>
          <h1>Live weather, beautifully tuned.</h1>
        </div>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      <SearchBar
        value={query}
        onChange={handleQueryChange}
        onSubmit={handleSubmit}
        suggestions={suggestions}
        recentSearches={recentSearches}
      />

      {error && <p className="error-message">{error}</p>}

      {loading && <Loader />}

      {!loading && weather && (
        <>
          <section className="dashboard-grid" aria-label="Weather dashboard">
            <WeatherCard current={weather.current} location={weather.location} />
            <SunCard
              astro={weather.forecast.forecastday[0].astro}
              localTime={weather.location.localtime}
            />
            <AirQuality airQuality={weather.current.air_quality} />
            <Forecast days={weather.forecast.forecastday} />
          </section>

          <section className="premium-grid" aria-label="Premium weather insights">
            <HourlyForecast hours={getNextHours(weather)} />
            <WeatherMap
              apiKey={API_KEY}
              current={weather.current}
              location={weather.location}
            />
            <StatCard
              title="UV Index"
              value={weather.current.uv}
              unit=""
              detail={getUvLabel(weather.current.uv)}
              tone={getUvLabel(weather.current.uv).toLowerCase()}
            />
            <StatCard title="Visibility" value={weather.current.vis_km} unit="km" detail="Current range" />
            <StatCard title="Pressure" value={weather.current.pressure_mb} unit="mb" detail="Sea-level pressure" />
            <MoonCard astro={weather.forecast.forecastday[0].astro} />
            <StatCard
              title="Chance of Rain"
              value={weather.forecast.forecastday[0].day.daily_chance_of_rain}
              unit="%"
              detail="Today"
              tone="rain"
            />
            <FavoriteCities
              cities={favoriteCities}
              currentCity={weather.location.name}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavoriteCity}
              onSelectCity={fetchWeather}
            />
            <AlertsSection alerts={weather.alerts?.alert || []} />
          </section>
        </>
      )}
    </main>
  )
}

export default App
