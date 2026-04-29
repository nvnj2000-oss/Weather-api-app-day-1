function AlertsSection({ alerts }) {
  return (
    <section className="glass-card alerts-card">
      <div className="section-heading">
        <div>
          <p className="card-label">Weather Alerts</p>
          <h2>{alerts.length ? `${alerts.length} Active Alert${alerts.length > 1 ? 's' : ''}` : 'All Clear'}</h2>
        </div>
      </div>

      {alerts.length ? (
        <div className="alerts-list">
          {alerts.map((alert) => (
            <article className="warning-card" key={`${alert.headline}-${alert.effective}`}>
              <p>{alert.event}</p>
              <h3>{alert.headline}</h3>
              <span>{alert.effective || 'Active now'}</span>
              <small>{alert.desc}</small>
            </article>
          ))}
        </div>
      ) : (
        <p className="empty-alert">No severe weather alerts for this location right now.</p>
      )}
    </section>
  )
}

export default AlertsSection
