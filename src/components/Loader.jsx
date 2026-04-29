function Loader() {
  return (
    <div className="loader-wrap" role="status" aria-live="polite">
      <span className="loader" />
      <p>Gathering live weather data</p>
      <div className="skeleton-grid" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

export default Loader
