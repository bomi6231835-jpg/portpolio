import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const screenAreaClass =
  'absolute left-[10.8%] top-[8%] h-[79%] w-[78.8%] rounded-[18px]'

const TabletZoomHero = forwardRef(function TabletZoomHero(
  { children, eyebrow, title, nextSectionId, onActiveSectionChange },
  ref,
) {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const mockupRef = useRef(null)
  const headingRef = useRef(null)
  const laptopRef = useRef(null)
  const skipButtonRef = useRef(null)
  const screenSlotRef = useRef(null)
  const portfolioFrameRef = useRef(null)
  const timelineRef = useRef(null)
  const zoomTriggerRef = useRef(null)
  const navigationTweenRef = useRef(null)
  const pendingNavigationFrameRef = useRef(null)

  const dispatchNextSectionArrival = useCallback(() => {
    if (!nextSectionId) return

    window.dispatchEvent(
      new CustomEvent('home:portfolio-section-arrived', {
        detail: { sectionId: nextSectionId },
      }),
    )
  }, [nextSectionId])

  const animateToScrollPosition = useCallback((targetPosition, onComplete) => {
    navigationTweenRef.current?.kill()

    const scrollPosition = { value: window.scrollY }
    navigationTweenRef.current = gsap.to(scrollPosition, {
      value: targetPosition,
      duration: 1,
      ease: 'power2.inOut',
      overwrite: true,
      onUpdate: () => window.scrollTo(0, scrollPosition.value),
      onComplete: () => {
        navigationTweenRef.current = null
        onComplete?.()
      },
    })
  }, [])

  const navigatePastHero = useCallback(
    (targetSectionId) => {
      const trigger = zoomTriggerRef.current
      const targetSection = document.getElementById(targetSectionId)
      if (!targetSection) return

      window.dispatchEvent(new CustomEvent('home:section-navigation-start'))
      navigationTweenRef.current?.kill()
      if (pendingNavigationFrameRef.current) {
        cancelAnimationFrame(pendingNavigationFrameRef.current)
      }

      if (trigger) {
        trigger.animation?.progress(1)
        window.scrollTo(0, trigger.end + 2)
      }

      pendingNavigationFrameRef.current = requestAnimationFrame(() => {
        pendingNavigationFrameRef.current = null
        const destination =
          targetSection.getBoundingClientRect().top + window.scrollY

        animateToScrollPosition(destination, () => {
          onActiveSectionChange?.(targetSectionId)
          window.dispatchEvent(new CustomEvent('home:section-navigation-end'))

          if (targetSectionId === nextSectionId) {
            dispatchNextSectionArrival()
          }
        })
      })
    },
    [
      animateToScrollPosition,
      dispatchNextSectionArrival,
      nextSectionId,
      onActiveSectionChange,
    ],
  )

  const navigateWithinHero = useCallback(
    (sectionId) => {
      window.dispatchEvent(new CustomEvent('home:section-navigation-end'))
      const trigger = zoomTriggerRef.current
      const timeline = timelineRef.current
      if (!trigger || !timeline) return

      if (pendingNavigationFrameRef.current) {
        cancelAnimationFrame(pendingNavigationFrameRef.current)
        pendingNavigationFrameRef.current = null
      }

      const targetProgress =
        sectionId === 'portfolio'
          ? timeline.labels['portfolio-expanded'] / timeline.duration()
          : 0
      const destination =
        trigger.start + (trigger.end - trigger.start) * targetProgress

      animateToScrollPosition(destination, () => {
        onActiveSectionChange?.(sectionId)
      })
    },
    [animateToScrollPosition, onActiveSectionChange],
  )

  useImperativeHandle(
    ref,
    () => ({
      navigateTo(sectionId) {
        if (sectionId === 'home' || sectionId === 'portfolio') {
          navigateWithinHero(sectionId)
          return
        }

        if (
          sectionId === 'skills' ||
          sectionId === 'learning' ||
          sectionId === 'about-me'
        ) {
          navigatePastHero(sectionId)
        }
      },
    }),
    [navigatePastHero, navigateWithinHero],
  )

  const handleExitToHome = useCallback(() => {
    navigatePastHero(nextSectionId)
  }, [navigatePastHero, nextSectionId])

  useLayoutEffect(() => {
    window.addEventListener('portfolio:exit-to-home', handleExitToHome)

    const ctx = gsap.context(() => {
      const getSlotBounds = () => {
        const pinBounds = pinRef.current.getBoundingClientRect()
        const slotBounds = screenSlotRef.current.getBoundingClientRect()

        return {
          left: slotBounds.left - pinBounds.left,
          top: slotBounds.top - pinBounds.top,
          width: slotBounds.width,
          height: slotBounds.height,
        }
      }

      const setFrameToSlot = () => {
        gsap.set(portfolioFrameRef.current, {
          ...getSlotBounds(),
          borderRadius: 18,
          y: 0,
        })
      }

      const getLaptopRevealY = () => {
        const laptop = laptopRef.current
        const pin = pinRef.current
        const centeredTop = Math.max(
          24,
          (pin.clientHeight - laptop.offsetHeight) / 2,
        )

        return centeredTop - laptop.offsetTop
      }

      setFrameToSlot()

      const timeline = gsap.timeline({
        onUpdate: () => {
          const portfolioTime = timeline.labels.portfolio ?? Infinity
          onActiveSectionChange?.(
            timeline.time() >= portfolioTime ? 'portfolio' : 'home',
          )
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=340%',
          pin: sectionRef.current,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefreshInit: setFrameToSlot,
          onRefresh: setFrameToSlot,
          onLeave: dispatchNextSectionArrival,
        },
      })
      timelineRef.current = timeline
      zoomTriggerRef.current = timeline.scrollTrigger

      timeline
        .addLabel('reveal', 0)
        .to(
          headingRef.current,
          {
            autoAlpha: 0,
            y: -80,
            duration: 0.65,
            ease: 'power2.in',
          },
          0,
        )
        .to(
          laptopRef.current,
          {
            y: () => getLaptopRevealY(),
            duration: 0.85,
            ease: 'power2.inOut',
          },
          0,
        )
        .to(
          portfolioFrameRef.current,
          {
            y: () => getLaptopRevealY(),
            duration: 0.85,
            ease: 'power2.inOut',
          },
          0,
        )
        .to({}, { duration: 0.35 })
        .addLabel('portfolio')
        .to(
          portfolioFrameRef.current,
          {
            left: 0,
            top: 0,
            width: () => pinRef.current.clientWidth,
            height: () => pinRef.current.clientHeight,
            borderRadius: 0,
            y: 0,
            duration: 1,
            ease: 'none',
          },
          'portfolio',
        )
        .to(
          mockupRef.current,
          {
            opacity: 0,
            scale: 0.98,
            duration: 0.7,
            ease: 'none',
          },
          'portfolio+=0.08',
        )
        .to(
          skipButtonRef.current,
          {
            autoAlpha: 0,
            y: 12,
            duration: 0.25,
            ease: 'power1.out',
          },
          'portfolio',
        )
        .addLabel('portfolio-expanded', 'portfolio+=1')
        .to({}, { duration: 1.4 })
    }, sectionRef)

    return () => {
      window.removeEventListener('portfolio:exit-to-home', handleExitToHome)
      navigationTweenRef.current?.kill()
      if (pendingNavigationFrameRef.current) {
        cancelAnimationFrame(pendingNavigationFrameRef.current)
      }
      navigationTweenRef.current = null
      pendingNavigationFrameRef.current = null
      timelineRef.current = null
      zoomTriggerRef.current = null
      ctx.revert()
    }
  }, [
    dispatchNextSectionArrival,
    handleExitToHome,
    onActiveSectionChange,
  ])

  return (
    <>
      <section
        ref={sectionRef}
        id="home"
        className="relative h-screen bg-white"
      >
        <div
          ref={pinRef}
          className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-white px-6"
        >
          <div
            ref={mockupRef}
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {(eyebrow || title) && (
              <header
                ref={headingRef}
                className="absolute left-1/2 top-[clamp(2.5rem,8vh,6rem)] z-20 w-[calc(100%-3rem)] max-w-[1300px] -translate-x-1/2 text-center"
              >
                {eyebrow && (
                  <p className="mt-13 text-base font-medium text-[var(--color-primary)] sm:text-lg">
                    {eyebrow}
                  </p>
                )}
                {title && (
                  <h1 className="mt-1 text-[clamp(3.5rem,7vw,5.5rem)] font-semibold leading-none tracking-normal text-[#171717]">
                    {title}
                  </h1>
                )}
              </header>
            )}

            <div
              ref={laptopRef}
              className="isolate absolute left-1/2 top-[clamp(15rem,36vh,25rem)] z-10 w-[min(110vw,1220px)] -translate-x-1/2 sm:w-[min(100vw,1220px)] lg:w-[min(94vw,1220px)]"
            >
              <div
                aria-hidden="true"
                className="absolute bottom-[2%] left-1/2 z-0 h-[55%] w-[calc(100vw-6rem)] max-w-[1300px] -translate-x-1/2 rounded-[28px] bg-[var(--color-primary)]"
              />
              <img
                className="relative z-20 w-full object-contain drop-shadow-[0_28px_55px_rgb(0_0_0_/_0.18)]"
                src="/img/laptop.png"
                alt="Laptop mockup"
              />
              <div ref={screenSlotRef} className={screenAreaClass} />
            </div>
          </div>

          <div
            ref={portfolioFrameRef}
            id="portfolio"
            className="absolute z-30 min-h-0 overflow-hidden bg-[var(--color-primary-light)] shadow-[0_24px_70px_rgb(0_0_0_/_0.18)]"
          >
            {children}
          </div>

          <button
            ref={skipButtonRef}
            type="button"
            onClick={() => navigatePastHero(nextSectionId)}
            className="absolute bottom-6 z-40 rounded-full border border-white/80 bg-white/85 px-5 py-3 text-xs font-bold tracking-[0.16em] text-[#453E67] shadow-[0_12px_35px_rgba(69,62,103,0.18)] backdrop-blur-xl transition-transform hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)] sm:bottom-8"
            style={{
              right: 'max(1.5rem, calc((100vw - 1300px) / 2 + 1.5rem))',
            }}
          >
            SKIP TO SKILLS
          </button>
        </div>
      </section>
    </>
  )
})

export default TabletZoomHero
