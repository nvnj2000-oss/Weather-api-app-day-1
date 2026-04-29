function formatDay(date) {
  return new Intl.DateTimeFormat('en', { weekday: 'short', month: 'short', day: 'numeric' }).format(
    new Date(date),
  )
}

function Forecast({ days }) {
  return (
    <section className="forecast-card glass-card">
      <div className="section-heading">
        <p className="card-label">Forecast</p>
        <h2>Next 3 Days</h2>
      </div>

      <div className="forecast-list">
        {days.map((day) => (
          <article className="forecast-day" key={day.date}>
            <div>
              <p>{formatDay(day.date)}</p>
              <span>{day.day.condition.text}</span>
            </div>
            <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} />
            <strong>{Math.round(day.day.avgtemp_c)}°C</strong>
            <small>
              {Math.round(day.day.mintemp_c)}° / {Math.round(day.day.maxtemp_c)}°
            </small>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Forecast
