function MoonCard({ astro }) {
  return (
    <article className="glass-card moon-card">
      <div className="section-heading">
        <div>
          <p className="card-label">Moon Phase</p>
          <h2>{astro.moon_phase}</h2>
        </div>
        <span className="moon-orb" aria-hidden="true" />
      </div>

      <dl className="moon-times">
        <div>
          <dt>Moonrise</dt>
          <dd>{astro.moonrise}</dd>
        </div>
        <div>
          <dt>Moonset</dt>
          <dd>{astro.moonset}</dd>
        </div>
      </dl>
    </article>
  )
}

export default MoonCard
