function SunCard({ astro, localTime }) {
  const date = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date(localTime))

  return (
    <article className="glass-card sun-card">
      <div className="section-heading">
        <p className="card-label">Sun Cycle</p>
        <h2>{date}</h2>
      </div>

      <div className="sun-arc" aria-hidden="true">
        <span />
      </div>

      <dl className="sun-times">
        <div>
          <dt>Sunrise</dt>
          <dd>{astro.sunrise}</dd>
        </div>
        <div>
          <dt>Sunset</dt>
          <dd>{astro.sunset}</dd>
        </div>
      </dl>
    </article>
  )
}

export default SunCard
