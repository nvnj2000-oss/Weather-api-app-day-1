const aqiScale = {
  1: ['Good', 'Fresh, easy breathing'],
  2: ['Moderate', 'Acceptable for most people'],
  3: ['Unhealthy', 'Sensitive groups take care'],
  4: ['Poor', 'Limit long outdoor activity'],
  5: ['Very Poor', 'Avoid heavy outdoor activity'],
  6: ['Hazardous', 'Stay indoors if possible'],
}

function AirQuality({ airQuality }) {
  const index = Math.round(airQuality?.['us-epa-index'] || 1)
  const [label, description] = aqiScale[index] || aqiScale[1]
  const score = Math.min(index, 6)

  return (
    <article className="glass-card air-card">
      <div className="section-heading">
        <p className="card-label">Air Quality</p>
        <h2>{label}</h2>
      </div>

      <div className="aqi-meter" style={{ '--aqi': `${(score / 6) * 100}%` }}>
        <span />
      </div>

      <p>{description}</p>
      <dl className="compact-metrics">
        <div>
          <dt>US EPA</dt>
          <dd>{index}</dd>
        </div>
        <div>
          <dt>PM2.5</dt>
          <dd>{Math.round(airQuality?.pm2_5 || 0)}</dd>
        </div>
      </dl>
    </article>
  )
}

export default AirQuality
