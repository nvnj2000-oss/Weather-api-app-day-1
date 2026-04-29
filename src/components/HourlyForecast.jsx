function formatHour(time) {
  return new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    hour12: true,
  }).format(new Date(time))
}

function HourlyForecast({ hours }) {
  return (
    <section className="glass-card hourly-card">
      <div className="section-heading">
        <div>
          <p className="card-label">Hourly Forecast</p>
          <h2>Next 24 Hours</h2>
        </div>
      </div>

      <div className="hourly-strip" aria-label="Next 24 hour weather forecast">
        {hours.map((hour) => (
          <article className="hour-tile" key={hour.time_epoch}>
            <p>{formatHour(hour.time)}</p>
            <img src={`https:${hour.condition.icon}`} alt={hour.condition.text} />
            <strong>{Math.round(hour.temp_c)}°C</strong>
            <span>{hour.chance_of_rain}% rain</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HourlyForecast
