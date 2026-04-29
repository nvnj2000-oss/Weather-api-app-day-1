function SearchBar({ value, onChange, onSubmit, suggestions, recentSearches }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(value)
  }

  const handlePick = (name) => {
    onChange(name)
    onSubmit(name)
  }

  return (
    <section className="search-panel" aria-label="Search weather by city">
      <form className="search-bar" onSubmit={handleSubmit}>
        <span className="search-icon" aria-hidden="true">
          Search
        </span>
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search city weather"
          aria-label="City name"
          autoComplete="off"
        />
        <button type="submit">Check Weather</button>
      </form>

      {(suggestions.length > 0 || recentSearches.length > 0) && (
        <div className="quick-picks">
          {suggestions.map((suggestion) => (
            <button
              type="button"
              key={`${suggestion.id}-${suggestion.name}`}
              onClick={() => handlePick(suggestion.name)}
            >
              {suggestion.name}, {suggestion.country}
            </button>
          ))}

          {suggestions.length === 0 &&
            recentSearches.map((recent) => (
              <button type="button" key={recent} onClick={() => handlePick(recent)}>
                {recent}
              </button>
            ))}
        </div>
      )}
    </section>
  )
}

export default SearchBar
