import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const aboutItems = [
  {
    tab: '경력',
    title: '나의 경력',
    path: [
      '디지털방송콘텐츠학과',
      'TV조선 “엄마의 봄날”\n조연출',
      'AI+X융합 프로그램',
    ],
    description: [
      '저는 에펙, 일러스트, 포토샵 등을 학교에서 배우고 영상 편집을 할 수 있어 배너 혹은 메인 화면을 꾸밀 수 있습니다.',
    ],
  },
  {
    tab: '목표',
    title: '목표',
    description: [
      '사용하기 편하면서도 시각적으로 완성도 높은 서비스를 만드는 프론트엔드 개발자가 되고 싶습니다.', '꾸준히 배우고 개선하며 신뢰할 수 있는 개발자로 성장하고 싶습니다.',
    ],
  },
  {
    tab: '방식',
    title: '일하는 방식',
    description: [
      '사용자 관점에서 문제를 바라보고 작은 불편도 놓치지 않으려고 합니다.', 
      '팀원과 적극적으로 소통하고, 피드백을 빠르게 반영하면서 더 나은 결과를 만들어갑니다.',
    ],
  },
  {
    tab: '전환',
    title: '업종 전환 이유',
    description: [
      '아이디어가 실제 화면과 기능으로 구현되는 과정에 매력을 느껴 프론트엔드 개발에 도전했습니다. 이전 경험에서 쌓은 소통 능력과 책임감을 개발 업무에도 연결하고 싶었습니다.',
    ],
  },
]

const AboutME = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const titleRef = useRef(null)
  const polaroidRef = useRef(null)
  const descriptionRef = useRef(null)
  const person1Ref = useRef(null)
  const person2Ref = useRef(null)
  const panelRefs = useRef([])
  const previousIndexRef = useRef(0)
  const directionRef = useRef(1)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () =>
      setPrefersReducedMotion(mediaQuery.matches)

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)

    return () =>
      mediaQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return undefined

    const timer = window.setInterval(() => {
      directionRef.current = 1
      setActiveIndex((current) => (current + 1) % aboutItems.length)
    }, 8000)

    return () => window.clearInterval(timer)
  }, [activeIndex, isPaused, prefersReducedMotion])

  useLayoutEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    const title = titleRef.current
    const polaroid = polaroidRef.current
    const description = descriptionRef.current
    const person1 = person1Ref.current
    const person2 = person2Ref.current

    if (
      !section ||
      !content ||
      !title ||
      !polaroid ||
      !description ||
      !person1 ||
      !person2
    ) {
      return undefined
    }

    const context = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      gsap.set(title, {
        y: () => Math.max((content.clientHeight - title.offsetHeight) / 2, 0),
      })
      gsap.set([polaroid, description], {
        autoAlpha: 0,
        y: 36,
      })
      gsap.set(person1, { autoAlpha: 1 })
      gsap.set(person2, { autoAlpha: 0 })

      const photoTimeline = prefersReducedMotion
        ? null
        : gsap
            .timeline({ paused: true, repeat: -1 })
            .to(
              person1,
              { autoAlpha: 0, duration: 0.7, ease: 'power2.inOut' },
              3,
            )
            .to(
              person2,
              { autoAlpha: 1, duration: 0.7, ease: 'power2.inOut' },
              3,
            )
            .to(
              person2,
              { autoAlpha: 0, duration: 0.7, ease: 'power2.inOut' },
              6.7,
            )
            .to(
              person1,
              { autoAlpha: 1, duration: 0.7, ease: 'power2.inOut' },
              6.7,
            )

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          once: true,
          invalidateOnRefresh: true,
        },
      })

      timeline
        .to({}, { duration: 1.5 })
        .to(title, {
          y: 0,
          duration: 1,
          ease: 'power2.inOut',
        })
        .to(
          [polaroid, description],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
          },
          '>-0.1',
        )
        .call(() => photoTimeline?.play())
    }, section)

    return () => context.revert()
  }, [])

  useLayoutEffect(() => {
    const previousIndex = previousIndexRef.current
    const previousPanel = panelRefs.current[previousIndex]
    const nextPanel = panelRefs.current[activeIndex]

    if (!nextPanel || previousIndex === activeIndex) {
      panelRefs.current.forEach((panel, index) => {
        if (panel && index !== activeIndex) {
          gsap.set(panel, { autoAlpha: 0, x: 0 })
        }
      })
      gsap.set(nextPanel, { autoAlpha: 1, x: 0 })
      return undefined
    }

    if (prefersReducedMotion) {
      gsap.set(previousPanel, { autoAlpha: 0, x: 0 })
      gsap.set(nextPanel, { autoAlpha: 1, x: 0 })
      previousIndexRef.current = activeIndex
      return undefined
    }

    const direction = directionRef.current
    const transition = gsap.timeline()

    transition
      .to(previousPanel, {
        autoAlpha: 0,
        x: -32 * direction,
        duration: 0.35,
        ease: 'power2.in',
      })
      .fromTo(
        nextPanel,
        { autoAlpha: 0, x: 32 * direction },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.45,
          ease: 'power2.out',
        },
        '>-0.05',
      )

    previousIndexRef.current = activeIndex

    return () => transition.kill()
  }, [activeIndex, prefersReducedMotion])

  const handleTabSelect = (nextIndex) => {
    if (nextIndex === activeIndex) return

    directionRef.current = nextIndex > activeIndex ? 1 : -1
    setActiveIndex(nextIndex)
  }

  const handleCardBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsPaused(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="about-me"
      className="relative flex min-h-screen w-full items-center bg-white"
      aria-labelledby="about-me-heading"
    >
      <div
        ref={contentRef}
        className="mx-auto min-h-[calc(100vh-8rem)] w-full max-w-[1300px] px-4 py-16 sm:px-10 lg:px-14"
      >
        <div ref={titleRef} className="will-change-transform">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[var(--color-primary)]">
            My Story
          </p>
          <h2
            id="about-me-heading"
            className="mt-4 text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-none tracking-[-0.06em] text-[var(--color-text)]"
          >
            ABOUT ME
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-[minmax(0,30fr)_minmax(0,70fr)] items-start gap-2 sm:mt-14 sm:gap-4 lg:grid-cols-[minmax(0,32fr)_minmax(0,68fr)] lg:gap-7">
          <div
            ref={polaroidRef}
            className="mt-20 w-[78%] max-w-[340px] origin-center -rotate-2 justify-self-center drop-shadow-[0_18px_22px_rgba(69,62,103,0.2)] will-change-transform"
          >
            <div className="relative aspect-[2444/2882] w-full">
            <div className='absolute inset-x-[4%] bottom-[13%] top-[4%] h-[90%] w-[95%] object-contain object-bottom bg-[var(--color-primary-light)]' />
            {/* <img 
                  src='/img/draw.png.png'
                  alt="그림샘플"
                  className='absolute inset-x-[10%] bottom-[15%] top-[6%] h-[77%] w-[90%] object-contain object-bottom' /> */}
              <img
                ref={person1Ref}
                src="/img/person1.png"
                alt="의자에 앉아 있는 사람"
                className="absolute inset-x-[20%] bottom-[12%] top-[15%] h-[80%] w-[84%] object-contain object-bottom"
              />
              <img
                ref={person2Ref}
                src="/img/person2.png"
                alt="비스듬히 서 있는 사람"
                className="absolute inset-x-[-6%] bottom-[15%] top-[13%] h-[80%] w-[84%] object-contain object-bottom"
              />
                
              <img
                src="/img/polaroid.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-fill"
              />
            </div>
          </div>

          <div
            ref={descriptionRef}
            className="min-w-0 w-full pt-1 will-change-transform sm:pt-4"
            aria-label="About me description"
          >
            <section
              className="min-h-[18rem] overflow-hidden rounded-2xl border border-[var(--color-primary)]/25 bg-white p-4 shadow-[0_18px_45px_rgba(69,62,103,0.12)] sm:min-h-[22rem] sm:rounded-3xl sm:p-6 lg:min-h-[24rem] lg:p-8"
              aria-label="About me details"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={handleCardBlur}
            >
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 border-b border-[var(--color-primary)]/15 pb-3 sm:gap-4 sm:pb-5">
                <p className="text-[0.55rem] font-black uppercase tracking-[0.14em] text-[var(--color-primary)] sm:text-sm sm:tracking-[0.2em]">
                  Profile
                </p>

                <div
                  className="grid min-w-0 grid-cols-4 gap-0.5 justify-self-end rounded-full bg-[var(--color-primary-light)] p-0.5 sm:gap-1 sm:p-1"
                  role="tablist"
                  aria-label="자기소개 항목"
                >
                  {aboutItems.map((item, index) => (
                    <button
                      key={item.tab}
                      id={`about-tab-${index}`}
                      type="button"
                      role="tab"
                      aria-selected={activeIndex === index}
                      aria-controls={`about-panel-${index}`}
                      onClick={() => handleTabSelect(index)}
                      className={`min-w-0 rounded-full px-1 py-1 text-[0.5rem] font-bold transition-colors sm:px-2.5 sm:py-1.5 sm:text-sm ${
                        activeIndex === index
                          ? 'bg-[var(--color-primary)] text-white shadow-sm'
                          : 'text-[#453E67] hover:bg-white/70 focus-visible:bg-white/70'
                      }`}
                    >
                      {item.tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative mt-4 min-h-[12rem] overflow-hidden sm:mt-6 sm:min-h-[15rem] lg:min-h-[17rem]">
                {aboutItems.map((item, index) => (
                  <article
                    key={item.title}
                    ref={(element) => {
                      panelRefs.current[index] = element
                    }}
                    id={`about-panel-${index}`}
                    role="tabpanel"
                    aria-labelledby={`about-tab-${index}`}
                    aria-hidden={activeIndex !== index}
                    className="absolute inset-0"
                  >
                    <p className="mb-2 text-[0.65rem] font-bold tracking-[0.12em] text-[var(--color-primary)] sm:mb-3 sm:text-sm">
                      0{index + 1}
                    </p>
                    <h3 className="text-sm font-black tracking-[-0.03em] text-[var(--color-text)] sm:text-2xl lg:text-3xl">
                      {item.title}
                    </h3>

                    {item.path && (
                      <ol
                        className="mt-3 flex flex-col items-stretch sm:mt-5 sm:flex-row sm:items-stretch sm:gap-7"
                        aria-label="경력 경로"
                      >
                        {item.path.map((step, stepIndex) => (
                          <li
                            key={step}
                            className="flex min-w-0 flex-col items-center sm:relative sm:flex-1"
                          >
                            <span className="flex min-h-12 w-full flex-1 items-center justify-center whitespace-pre-line rounded-lg border border-[var(--color-primary)]/25 bg-[var(--color-primary)] px-2 py-2 text-center text-sm font-bold leading-tight text-[white] sm:min-h-14 sm:px-3 sm:text-sm lg:text-base">
                              {step}
                            </span>
                            {stepIndex < item.path.length - 1 && (
                              <span
                                className="px-1 text-sm font-black text-[var(--color-primary)] sm:absolute sm:left-full sm:top-1/2 sm:w-7 sm:-translate-y-1/2 sm:px-0 sm:text-center sm:text-base lg:text-lg"
                                aria-hidden="true"
                              >
                                <span className="sm:hidden">↓</span>
                                <span className="hidden sm:inline"> → </span>
                              </span>
                            )}
                          </li>
                        ))}
                      </ol>
                    )}

                    <ul className="mt-3 list-disc space-y-2 pl-5 break-keep text-[0.65rem] leading-[1.65] text-[#5E5872] marker:text-[var(--color-primary)] sm:mt-5 sm:text-sm sm:leading-7 lg:text-base lg:leading-8">
                      {item.description.map((description) => (
                        <li key={description}>{description}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutME
