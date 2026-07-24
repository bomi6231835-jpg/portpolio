import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const screenAreaClass =
  'absolute left-[10.8%] top-[8%] h-[79%] w-[78.8%] rounded-[18px]'

function TabletZoomHero({ children, nextSectionId }) {
  const [isCompleted, setIsCompleted] = useState(false)
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const mockupRef = useRef(null)
  const screenSlotRef = useRef(null)
  const portfolioFrameRef = useRef(null)
  const exitTweenRef = useRef(null)
  const exitDelayRef = useRef(null)
  const nextSectionTweenRef = useRef(null)
  const timelineRef = useRef(null)
  const zoomTriggerRef = useRef(null)
  const isExitingRef = useRef(false)
  const isCompletedRef = useRef(false)

  const handleExitToHome = useCallback(() => {
    if (isExitingRef.current || isCompletedRef.current) return

    isExitingRef.current = true
    const scrollPosition = { value: window.scrollY }
    const laptopPosition =
      zoomTriggerRef.current?.start ?? sectionRef.current?.offsetTop ?? 0

    exitTweenRef.current = gsap.to(scrollPosition, {
      value: laptopPosition,
      duration: 1.8,
      ease: 'power2.inOut',
      overwrite: true,
      onUpdate: () => window.scrollTo(0, scrollPosition.value),
      onComplete: () => {
        exitTweenRef.current = null

        exitDelayRef.current = gsap.delayedCall(0.4, () => {
          timelineRef.current?.progress(0).pause()
          zoomTriggerRef.current?.kill()
          zoomTriggerRef.current = null
          isCompletedRef.current = true
          setIsCompleted(true)

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const nextSection = nextSectionId
                ? document.getElementById(nextSectionId)
                : null

              if (!nextSection) {
                exitDelayRef.current = null
                return
              }

              const nextSectionPosition =
                nextSection.getBoundingClientRect().top + window.scrollY
              const nextScrollPosition = { value: window.scrollY }

              nextSectionTweenRef.current = gsap.to(nextScrollPosition, {
                value: nextSectionPosition,
                duration: 1,
                ease: 'power2.inOut',
                overwrite: true,
                onUpdate: () => window.scrollTo(0, nextScrollPosition.value),
                onComplete: () => {
                  nextSectionTweenRef.current = null
                  exitDelayRef.current = null

                  window.dispatchEvent(
                    new CustomEvent('home:portfolio-section-arrived', {
                      detail: { sectionId: nextSectionId },
                    }),
                  )
                },
              })
            })
          })
        })
      },
    })
  }, [nextSectionId])

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
        })
      }

      setFrameToSlot()

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=240%',
          pin: pinRef.current,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefreshInit: setFrameToSlot,
          onRefresh: setFrameToSlot,
        },
      })
      timelineRef.current = timeline
      zoomTriggerRef.current = timeline.scrollTrigger

      timeline
        .fromTo(
          portfolioFrameRef.current,
          {
            left: () => getSlotBounds().left,
            top: () => getSlotBounds().top,
            width: () => getSlotBounds().width,
            height: () => getSlotBounds().height,
            borderRadius: 18,
          },
          {
            left: 0,
            top: 0,
            width: () => pinRef.current.clientWidth,
            height: () => pinRef.current.clientHeight,
            borderRadius: 0,
            duration: 1,
            ease: 'none',
          },
          0,
        )
        .to(
          mockupRef.current,
          {
            opacity: 0,
            scale: 0.98,
            duration: 0.7,
            ease: 'none',
          },
          0.08,
        )
        .to({}, { duration: 1.4 })
    }, sectionRef)

    return () => {
      window.removeEventListener('portfolio:exit-to-home', handleExitToHome)
      exitTweenRef.current?.kill()
      exitDelayRef.current?.kill()
      nextSectionTweenRef.current?.kill()
      exitTweenRef.current = null
      exitDelayRef.current = null
      nextSectionTweenRef.current = null
      timelineRef.current = null
      zoomTriggerRef.current = null
      isExitingRef.current = false
      isCompletedRef.current = false
      ctx.revert()
    }
  }, [handleExitToHome])

  return (
    <>
      <section
        ref={sectionRef}
        className={`relative bg-white ${isCompleted ? 'h-screen' : 'h-[250vh]'}`}
      >
        <div
          ref={pinRef}
          className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-white px-6"
        >
          <div
            ref={mockupRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="absolute inset-x-8 bottom-[5vh] h-[50vh] rounded-[28px] bg-[var(--color-primary)]" />
            <div className="relative z-10 w-[min(92vw,1180px)]">
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
            className="absolute z-30 min-h-0 overflow-hidden bg-[var(--color-primary-light)] shadow-[0_24px_70px_rgb(0_0_0_/_0.18)]"
          >
            {children}
          </div>
        </div>
      </section>
    </>
  )
}

export default TabletZoomHero
