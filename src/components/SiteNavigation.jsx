import { useState } from 'react'

const navigationItems = [
  { id: 'home', label: 'HOME' },
  { id: 'portfolio', label: 'PORTFOLIO' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'learning', label: 'LEARNING' },
  { id: 'about-me', label: 'ABOUT ME' },
]

const NavigationItems = ({ activeSection, onNavigate }) =>
  navigationItems.map((item) => (
    <button
      key={item.id}
      type="button"
      aria-current={activeSection === item.id ? 'page' : undefined}
      onClick={() => onNavigate(item.id)}
      className={`rounded-full px-4 py-2 text-xs font-bold tracking-[0.12em] transition-colors ${
        activeSection === item.id
          ? 'bg-[var(--color-primary)] text-white'
          : 'text-[#453E67] hover:bg-[#EEE9FF] focus-visible:bg-[#EEE9FF]'
      }`}
    >
      {item.label}
    </button>
  ))

const SiteNavigation = ({ activeSection, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigate = (sectionId) => {
    setIsOpen(false)
    onNavigate(sectionId)
  }

  return (
    <nav
      aria-label="Portfolio sections"
      className="fixed left-1/2 top-4 z-[100] -translate-x-1/2"
    >
      <div className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/80 p-1.5 shadow-[0_12px_35px_rgba(69,62,103,0.16)] backdrop-blur-xl sm:flex">
        <NavigationItems
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />
      </div>

      <div className="relative sm:hidden">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="site-navigation-menu"
          onClick={() => setIsOpen((current) => !current)}
          className="flex h-11 items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 text-xs font-bold tracking-[0.12em] text-[#453E67] shadow-[0_10px_30px_rgba(69,62,103,0.16)] backdrop-blur-xl"
        >
          MENU
          <span aria-hidden="true">{isOpen ? '×' : '＋'}</span>
        </button>

        {isOpen && (
          <div
            id="site-navigation-menu"
            className="absolute left-1/2 top-14 flex -translate-x-1/2 flex-col gap-1 rounded-[1.25rem] border border-white/70 bg-white/95 p-2 shadow-[0_15px_40px_rgba(69,62,103,0.2)] backdrop-blur-xl"
          >
            <NavigationItems
              activeSection={activeSection}
              onNavigate={handleNavigate}
            />
          </div>
        )}
      </div>
    </nav>
  )
}

export default SiteNavigation
