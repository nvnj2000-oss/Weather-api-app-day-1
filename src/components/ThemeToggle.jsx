function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className={isDark ? 'is-active' : ''}>Dark</span>
      <span className={!isDark ? 'is-active' : ''}>Light</span>
    </button>
  )
}

export default ThemeToggle
