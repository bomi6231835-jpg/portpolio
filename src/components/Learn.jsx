import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const learningCards = [
  {
    number: '01',
    eyebrow: 'FOUNDATION',
    title: '프론트엔드 기초',
    description:
      '웹 표준과 반응형 레이아웃을 바탕으로, 다양한 화면에서도 명확하게 정보를 전달하는 방법을 학습합니다.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    accent: 'from-[#E9ECFF] to-[#F8F9FF]',
  },
  {
    number: '02',
    eyebrow: 'INTERFACE',
    title: 'React 인터페이스',
    description:
      '컴포넌트 중심의 설계와 상태 관리를 익히며, 재사용하기 쉽고 자연스럽게 반응하는 화면을 구현합니다.',
    tags: ['React', 'Components', 'UI'],
    accent: 'from-[#EEF0FF] to-[#F9F4FF]',
  },
  {
    number: '03',
    eyebrow: 'BACKEND',
    title: 'Python 백엔드',
    description:
      'Python을 활용한 서버 로직과 API의 흐름을 이해하고, 프론트엔드와 데이터를 연결하는 경험을 쌓습니다.',
    tags: ['Python', 'Flask', 'REST API'],
    accent: 'from-[#EAF5FF] to-[#F5F7FF]',
  },
  {
    number: '04',
    eyebrow: 'DATA',
    title: '데이터 분석',
    description:
      '데이터를 정리하고 탐색하는 과정을 통해 의미 있는 패턴을 찾고, 결과를 이해하기 쉽게 시각화합니다.',
    tags: ['Pandas', 'Analysis', 'Visualization'],
    accent: 'from-[#EAFBFA] to-[#F3F7FF]',
  },
  {
    number: '05',
    eyebrow: 'INTELLIGENCE',
    title: 'AI·LLM 활용',
    description:
      '머신러닝과 언어 모델의 기본 원리를 익히고, 실제 문제에 적용할 수 있는 활용 방법을 탐구합니다.',
    tags: ['Machine Learning', 'LLM', 'Prompting'],
    accent: 'from-[#F2ECFF] to-[#FAF7FF]',
  },
  {
    number: '06',
    eyebrow: 'WORKFLOW',
    title: 'DevOps·협업',
    description:
      '버전 관리와 컨테이너 기반의 작업 흐름을 익히며, 안정적으로 공유하고 협업하는 방식을 학습합니다.',
    tags: ['GitHub', 'Docker', 'CI/CD'],
    accent: 'from-[#ECEFFF] to-[#F4F5FF]',
  },
]

const Learn = () => {
  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    const progress = progressRef.current

    if (!section || !viewport || !track || !progress) return undefined

    const getScrollDistance = () =>
      Math.max(0, track.scrollWidth - viewport.clientWidth)

    const context = gsap.context(() => {
      gsap.set(track, { x: 0 })
      gsap.set(progress, {
        scaleX: 0,
        transformOrigin: 'left center',
      })

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () =>
            `+=${Math.max(
              getScrollDistance() * 1.25,
              window.innerHeight * 1.5,
            )}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      timeline
        .to(track, { x: () => -getScrollDistance() }, 0)
        .to(progress, { scaleX: 1 }, 0)
    }, section)

    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      window.cancelAnimationFrame(refreshFrame)
      context.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="learn-heading"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-white"
    >
      <div className="w-full py-12 sm:py-16 lg:py-20">
        <header className="px-6 sm:px-10 lg:px-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-primary)] sm:text-sm">
            Learning Journey
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            {/* <h2
              id="learn-heading"
              className="text-6xl text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-none tracking-[-0.06em] text-[var(--color-text)]"
            >
              학습과 경험
            </h2> */}
            <p className="max-w-md text-sm leading-6 text-neutral-500 sm:text-right sm:text-base">
              배운 것을 직접 만들며 확인하고,
              <br className="hidden sm:block" /> 경험을 다음 도전으로 연결합니다.
            </p>
          </div>
        </header>

        <div
          ref={viewportRef}
          className="mt-10 w-full overflow-hidden sm:mt-12 lg:mt-14"
        >
          <div
            ref={trackRef}
            className="flex w-max flex-nowrap gap-5 px-6 will-change-transform sm:gap-6 sm:px-10 lg:gap-8 lg:px-14"
          >
            {learningCards.map((card) => (
              <article
                key={card.number}
                className={`relative flex h-[22rem] w-[min(82vw,22rem)] shrink-0 flex-col overflow-hidden rounded-[2rem] border border-[#DDE1FF] bg-gradient-to-br ${card.accent} p-6 shadow-[0_20px_60px_rgba(69,62,71,0.09)] sm:h-[24rem] sm:w-[24rem] sm:p-8 lg:h-[26rem] lg:w-[28rem] lg:p-10`}
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[var(--color-primary)] opacity-10 blur-2xl"
                />

                <div className="relative flex items-start justify-between">
                  <span className="text-xs font-bold tracking-[0.2em] text-[var(--color-primary-strong)]">
                    {card.eyebrow}
                  </span>
                  <span className="text-3xl font-black tracking-[-0.06em] text-[var(--color-primary)]/35 sm:text-4xl">
                    {card.number}
                  </span>
                </div>

                <div className="relative mt-auto">
                  <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-[var(--color-text)] sm:text-3xl">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
                    {card.description}
                  </p>
                  <ul
                    aria-label={`${card.title} 학습 키워드`}
                    className="mt-6 flex flex-wrap gap-2"
                  >
                    {card.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-[#C9CEFF] bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#453E67] backdrop-blur-sm"
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
            <span>01 — 06</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Learn
