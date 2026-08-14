import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LearningCardSection = ({
  id,
  eyebrow,
  title,
  description,
  cards,
  nextSectionId,
}) => {
  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)
  const cardsRef = useRef([])
  const navigationTweenRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    const progress = progressRef.current
    const cardElements = cardsRef.current.slice(0, cards.length).filter(Boolean)
    let isDirectNavigationActive = false

    if (
      !section ||
      !viewport ||
      !track ||
      !progress ||
      !cardElements.length
    ) {
      return undefined
    }

    const getCenteredTrackX = (card) =>
      viewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2)

    const getWaitingTrackX = (card) =>
      viewport.clientWidth - card.offsetLeft - card.offsetWidth * 0.28

    const handleDirectNavigationStart = () => {
      isDirectNavigationActive = true
      navigationTweenRef.current?.kill()
      navigationTweenRef.current = null
    }

    const handleDirectNavigationEnd = () => {
      isDirectNavigationActive = false
    }

    const scrollToNextSection = () => {
      if (
        !nextSectionId ||
        navigationTweenRef.current ||
        isDirectNavigationActive
      ) {
        return
      }

      const nextSection = document.getElementById(nextSectionId)
      if (!nextSection) return

      const scrollPosition = { value: window.scrollY }
      const destination =
        nextSection.getBoundingClientRect().top + window.scrollY

      navigationTweenRef.current = gsap.to(scrollPosition, {
        value: destination,
        duration: 1,
        ease: 'power2.inOut',
        overwrite: true,
        onUpdate: () => window.scrollTo(0, scrollPosition.value),
        onComplete: () => {
          navigationTweenRef.current = null
        },
      })
    }

    const context = gsap.context(() => {
      gsap.set(track, { x: () => getWaitingTrackX(cardElements[0]) })
      gsap.set(cardElements, {
        autoAlpha: 0.3,
        x: 0,
        y: 0,
        scale: 0.92,
        filter: 'blur(4px)',
        boxShadow: '0 12px 35px rgba(69, 62, 71, 0.06)',
        transformOrigin: 'center center',
      })
      gsap.set(progress, {
        scaleX: 0,
        transformOrigin: 'left center',
      })

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out', duration: 0.8 },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () =>
            `+=${Math.max(
              window.innerHeight * cards.length * 0.8,
              cards.length * 520,
            )}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onRefreshInit: () => {
            gsap.set(track, { x: getWaitingTrackX(cardElements[0]) })
          },
          onLeave: scrollToNextSection,
        },
      })

      cardElements.forEach((card, index) => {
        const position = index

        timeline.to(
          track,
          { x: () => getCenteredTrackX(card) },
          position,
        )
        timeline.to(
          card,
          {
            autoAlpha: 1,
            x: 0,
            y: -8,
            scale: 1.04,
            filter: 'blur(0px)',
            boxShadow: '0 30px 80px rgba(69, 62, 71, 0.24)',
          },
          position,
        )

        if (index > 0) {
          timeline.to(
            cardElements[index - 1],
            {
              autoAlpha: 0.42,
              y: 0,
              scale: 0.93,
              filter: 'blur(3px)',
              boxShadow: '0 12px 35px rgba(69, 62, 71, 0.07)',
            },
            position,
          )
        }
      })

      timeline.to({}, { duration: 0.45 })
      timeline.to(
        progress,
        { scaleX: 1, duration: timeline.duration(), ease: 'none' },
        0,
      )
    }, section)

    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
    window.addEventListener(
      'home:section-navigation-start',
      handleDirectNavigationStart,
    )
    window.addEventListener(
      'home:section-navigation-end',
      handleDirectNavigationEnd,
    )

    return () => {
      window.cancelAnimationFrame(refreshFrame)
      window.removeEventListener(
        'home:section-navigation-start',
        handleDirectNavigationStart,
      )
      window.removeEventListener(
        'home:section-navigation-end',
        handleDirectNavigationEnd,
      )
      navigationTweenRef.current?.kill()
      navigationTweenRef.current = null
      context.revert()
    }
  }, [cards, nextSectionId])

  const headingId = `${id}-heading`
  const finalCardNumber = String(cards.length).padStart(2, '0')

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={headingId}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-white"
    >
      <div className="mx-auto w-full max-w-[1300px] py-12 sm:py-16 lg:py-20">
        <header className="px-6 sm:px-10 lg:px-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-primary)] sm:text-sm">
            {eyebrow}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id={headingId}
              className="text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-none tracking-[-0.06em] text-[var(--color-text)]">
              {title}
            </h2>
            <p className="max-w-md text-sm leading-6 text-neutral-500 sm:ml-auto sm:text-right sm:text-base">
              {description}
            </p>
          </div>
        </header>

        <div ref={viewportRef} className="mt-10 w-full sm:mt-12 lg:mt-14">
          <div
            ref={trackRef}
            className="flex w-max flex-nowrap gap-5 px-6 will-change-transform sm:gap-6 sm:px-10 lg:gap-8 lg:px-14"
          >
            {cards.map((card, index) => (
              <article
                key={card.number}
                ref={(element) => {
                  cardsRef.current[index] = element
                }}
                className={`invisible relative flex h-[18rem] w-[min(78vw,20rem)] shrink-0 flex-col overflow-hidden rounded-[2rem] border border-[#DDE1FF] bg-gradient-to-br ${card.accent} p-6 will-change-[transform,filter,opacity] sm:h-[20rem] sm:w-[22rem] sm:p-7 lg:h-[22rem] lg:w-[25rem] lg:p-8`}
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[var(--color-primary)] opacity-10 blur-2xl"
                />
                <div className="relative flex items-start justify-between">
                  {card.eyebrow && (
                    <span className="text-xs font-bold tracking-[0.2em] text-[var(--color-primary-strong)]">
                      {card.eyebrow}
                    </span>
                  )}
                  <span className="text-3xl font-black tracking-[-0.06em] text-[var(--color-primary)]/35 sm:text-4xl">
                    {card.number}
                  </span>
                </div>
                <div className={`relative ${card.eyebrow ? 'mt-auto' : 'mt-6'}`}>
                  <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-[var(--color-text)] sm:text-3xl whitespace-pre-wrap">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7 whitespace-pre-wrap">
                    {card.description}
                  </p>
                  <ul
                    aria-label={`${card.title} 학습 키워드`}
                    className="mt-6 flex flex-wrap gap-2"
                  >
                    {(card.tags ?? []).map((tag) => (
                      <li
                        key={tag}
                        className="
                        rounded-full border border-[#C9CEFF] bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#453E67] backdrop-blur-sm"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 px-6 sm:px-10 lg:px-14">
          <div className="h-1 w-full overflow-hidden rounded-full bg-[#E9ECFF]">
            <div
              ref={progressRef}
              className="h-full w-full rounded-full bg-[var(--color-primary)] will-change-transform"
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-[0.65rem] font-bold tracking-[0.18em] text-neutral-400">
            <span>SCROLL TO EXPLORE</span>
            <span>01 — {finalCardNumber}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LearningCardSection
