function WeatherCard({ current, location }) {
  return (
    <article className="weather-card hero-card">
      <div className="hero-card-header">
        <div>
          <p className="card-label">Current Weather</p>
          <h2>
            {location.name}
            <span>{location.country}</span>
          </h2>
        </div>
        <img src={`https:${current.condition.icon}`} alt={current.condition.text} />
      </div>

      <div className="temperature-row">
        <strong>{Math.round(current.temp_c)}°</strong>
        <div>
          <p>{current.condition.text}</p>
          <span>Feels like {Math.round(current.feelslike_c)}°C</span>
        </div>
      </div>

      <dl className="metric-grid">
        <div>
          <dt>Humidity</dt>
          <dd>{current.humidity}%</dd>
        </div>
        <div>
          <dt>Wind</dt>
          <dd>{current.wind_kph} km/h</dd>
        </div>
        <div>
          <dt>Local Time</dt>
          <dd>{location.localtime.split(' ')[1]}</dd>
        </div>
      </dl>
    </article>
  )
}

export default WeatherCard
