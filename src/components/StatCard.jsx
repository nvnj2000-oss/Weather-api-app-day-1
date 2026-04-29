function StatCard({ title, value, unit, detail, tone = 'default' }) {
  return (
    <article className={`glass-card stat-card tone-${tone}`}>
      <p className="card-label">{title}</p>
      <div className="stat-value">
        <strong>{value}</strong>
        {unit && <span>{unit}</span>}
      </div>
      <p>{detail}</p>
    </article>
  )
}

export default StatCard
