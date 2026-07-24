function PortfolioHeader({ themeMode, onThemeToggle }) {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <header
      className="sticky top-0 z-10 grid grid-cols-[auto_minmax(220px,520px)_auto_auto] items-center gap-[22px] border-b border-[var(--portfolio-line)] bg-[var(--portfolio-header)] px-[clamp(18px,4vw,56px)] py-[18px] backdrop-blur-[18px] transition-colors duration-300 max-[900px]:grid-cols-1 max-[620px]:gap-3.5"
      aria-label="Main navigation"
    >
      <a className="flex items-center gap-2.5 font-extrabold" href="#">
        <span className="grid h-7 w-[38px] place-items-center rounded-[8px] bg-[var(--portfolio-accent-strong)] text-white shadow-[0_10px_24px_rgba(128,141,253,0.38)]">
          &#9658;
        </span>
        <span>Framefolio</span>
      </a>

      <form
        className="flex h-11 items-center overflow-hidden rounded-full border border-[var(--portfolio-line)] bg-[var(--portfolio-input)]"
        role="search"
        onSubmit={handleSubmit}
      >
        <label className="sr-only" htmlFor="portfolio-search">
          Search projects
        </label>
        <input
          id="portfolio-search"
          className="min-w-0 flex-1 bg-transparent px-[18px] text-[var(--portfolio-text)] outline-none placeholder:text-[var(--portfolio-muted)]"
          type="search"
          placeholder="Search work, role, genre"
        />
        <button
          className="h-11 w-12 cursor-pointer border-0 bg-[var(--portfolio-accent-strong)] text-white"
          type="submit"
          aria-label="Search"
        >
          Go
        </button>
      </form>

      <nav
        className="flex justify-end gap-[18px] text-sm font-bold text-[var(--portfolio-muted)] max-[900px]:justify-start"
        aria-label="Portfolio sections"
      >
        <a className="hover:text-[var(--portfolio-text)]" href="#work">
          Works
        </a>
        <a className="hover:text-[var(--portfolio-text)]" href="#about">
          About
        </a>
        <a className="hover:text-[var(--portfolio-text)]" href="#contact">
          Contact
        </a>
      </nav>

      <button
        className="flex h-9 w-[98px] cursor-pointer items-center rounded-full border border-[var(--portfolio-line)] bg-[var(--portfolio-input)] p-1 text-xs font-extrabold text-[var(--portfolio-muted)] transition-colors"
        type="button"
        role="switch"
        aria-checked={themeMode === 'dark'}
        aria-label="Toggle color mode"
        onClick={onThemeToggle}
      >
        <span
          className={`grid h-7 w-11 place-items-center rounded-full transition-all duration-300 ${
            themeMode === 'dark'
              ? 'translate-x-[43px] bg-[var(--portfolio-accent-strong)] text-white'
              : 'translate-x-0 bg-white text-[#66709a]'
          }`}
        >
          {themeMode === 'dark' ? 'Dark' : 'Light'}
        </span>
      </button>
    </header>
  )
}

export default PortfolioHeader
