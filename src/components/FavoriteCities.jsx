function FavoriteCities({ cities, currentCity, isFavorite, onToggleFavorite, onSelectCity }) {
  return (
    <section className="glass-card favorites-card">
      <div className="section-heading">
        <div>
          <p className="card-label">Favorite Cities</p>
          <h2>{currentCity}</h2>
        </div>
        <button className="favorite-toggle" type="button" onClick={onToggleFavorite}>
          {isFavorite ? 'Saved' : 'Save'}
        </button>
      </div>

      {cities.length > 0 ? (
        <div className="favorite-list">
          {cities.map((city) => (
            <button type="button" key={city} onClick={() => onSelectCity(city)}>
              {city}
            </button>
          ))}
        </div>
      ) : (
        <p className="empty-alert">Save cities you check often and jump back to them instantly.</p>
      )}
    </section>
  )
}

export default FavoriteCities
