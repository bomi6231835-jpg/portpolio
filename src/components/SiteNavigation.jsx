import { useEffect, useRef, useState } from 'react'

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

const SiteNavigation = ({ activeSection, onNavigate, isHidden = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isInitiallyVisible, setIsInitiallyVisible] = useState(true)
  const [isDesktopVisible, setIsDesktopVisible] = useState(false)
  const hideDelayRef = useRef(null)

  const clearHideDelay = () => {
    if (!hideDelayRef.current) return

    window.clearTimeout(hideDelayRef.current)
    hideDelayRef.current = null
  }

  useEffect(() => {
    const initialVisibilityTimer = window.setTimeout(() => {
      setIsInitiallyVisible(false)
    }, 4000)

    return () => window.clearTimeout(initialVisibilityTimer)
  }, [])

  useEffect(() => {
    if (!isHidden) return undefined

    clearHideDelay()
    const hiddenStateTimer = window.setTimeout(() => {
      setIsDesktopVisible(false)
      setIsOpen(false)
    }, 0)

    return () => window.clearTimeout(hiddenStateTimer)
  }, [isHidden])

  useEffect(
    () => () => {
      clearHideDelay()
    },
    [],
  )

  const showDesktopNavigation = () => {
    if (isHidden) return

    clearHideDelay()
    setIsDesktopVisible(true)
  }

  const scheduleDesktopNavigationHide = () => {
    clearHideDelay()
    hideDelayRef.current = window.setTimeout(() => {
      setIsDesktopVisible(false)
      hideDelayRef.current = null
    }, 500)
  }

  const handleNavigate = (sectionId) => {
    setIsOpen(false)
    setIsDesktopVisible(false)
    onNavigate(sectionId)
  }

  const isDesktopNavigationShown =
    !isHidden && (isInitiallyVisible || isDesktopVisible)
  const isMobileNavigationShown = !isHidden && (isInitiallyVisible || isOpen)

  return (
    <>
      <div
        aria-hidden="true"
        onMouseEnter={showDesktopNavigation}
        onMouseLeave={scheduleDesktopNavigationHide}
        className={`fixed inset-x-0 top-0 z-[99] hidden h-6 sm:block ${
          isHidden ? 'pointer-events-none' : ''
        }`}
      />

      <nav
        aria-label="Portfolio sections"
        aria-hidden={!isDesktopNavigationShown}
        inert={!isDesktopNavigationShown}
        onMouseEnter={showDesktopNavigation}
        onMouseLeave={scheduleDesktopNavigationHide}
        onFocusCapture={showDesktopNavigation}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            scheduleDesktopNavigationHide()
          }
        }}
        className={`fixed left-1/2 top-4 z-[100] hidden -translate-x-1/2 transition-[translate,opacity] duration-500 ease-out motion-reduce:transition-none sm:block ${
          isDesktopNavigationShown
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-[calc(100%+1.5rem)] opacity-0'
        }`}
      >
        <div className="flex items-center gap-1 rounded-full border border-white/70 bg-white/80 p-1.5 shadow-[0_12px_35px_rgba(69,62,103,0.16)] backdrop-blur-xl">
          <NavigationItems
            activeSection={activeSection}
            onNavigate={handleNavigate}
          />
        </div>
      </nav>

      <button
        type="button"
        aria-label="Open site navigation"
        aria-expanded={isOpen}
        aria-controls="site-navigation-menu"
        onClick={() => setIsOpen(true)}
        className={`fixed left-1/2 top-0 z-[99] h-6 -translate-x-1/2 rounded-b-lg border border-t-0 border-white/70 bg-white/90 px-4 text-[0.6rem] font-black tracking-[0.16em] text-[#453E67] shadow-[0_8px_20px_rgba(69,62,103,0.14)] backdrop-blur-xl transition-[translate,opacity] duration-300 motion-reduce:transition-none sm:hidden ${
          !isHidden && !isMobileNavigationShown
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-full opacity-0'
        }`}
      >
        MENU
      </button>

      <nav
        aria-label="Portfolio sections"
        aria-hidden={!isMobileNavigationShown}
        inert={!isMobileNavigationShown}
        className={`fixed left-1/2 top-4 z-[100] -translate-x-1/2 transition-[translate,opacity] duration-500 ease-out motion-reduce:transition-none sm:hidden ${
          isMobileNavigationShown
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-[calc(100%+1.5rem)] opacity-0'
        }`}
      >
        <div className="relative">
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
    </>
  )
}

export default SiteNavigation
