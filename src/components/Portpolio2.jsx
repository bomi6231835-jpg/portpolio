import { useEffect, useMemo, useRef, useState } from 'react'
import Footer from './Footer'

const projects = [
  {
    title: '오늘 뭐먹지?',
    eyebrow: 'React Team Project',
    meta: 'UPLOAD 2026.07.28',
    category: 'WEB · TEAM PROJECT',
    duration: '06.19 - 07.27',
    type: '오늘 뭐먹지',
    roleTitle: '프론트엔드 리드',
    stack: ['React', 'Flask', 'Tailwind', 'WebSocket', 'API', 'Figma'],
    summary:
      '상품 검색 속도와 실시간 채팅 경험을 개선한 중고거래 플랫폼입니다. 검색 필터, 상품 상세, 채팅 흐름을 영상 포트폴리오처럼 한눈에 볼 수 있도록 구성했습니다.',
    timeline:
      '00:00 인트로 · 00:24 검색 필터 · 01:10 상품 상세 · 02:15 실시간 채팅 · 03:20 마무리',
    role:
      '프론트엔드 리드를 맡아 검색 UI, 상품 상세 화면, 실시간 채팅 화면의 설계와 구현을 담당했습니다.',
    thumbClass: 'bg-[linear-gradient(135deg,#808DFD,#C6CBFF)]',
    img: '/img/portpolio2/today-menu.png',
    progress: 38,
    githubUrl:'https://github.com/bomi6231835-jpg/today-menu.git',
    deployUrl:'https://today-menu-git-main-sdhuen01-3018s-projects.vercel.app',
    pdfUrl: '/pdfs/today-menu.pdf',

  },
  {
    title: '서울시 의약품 수요예측\n및 재고관리',
    eyebrow: '허깅페이스 배포',
    meta: 'UPLOAD 2026.06.19',
    category: 'AI · DATA',
    duration: '02:15',
    type: '도라에몽의약주머니',
    roleTitle: '머신러닝, 스트림릿, 허깅페이스',
    stack: ['Machine Learning', 'Colab', 'LLM', 'Huggingface', 'Streamlit','Figma'],
    summary:
      '사용자의 이력서 문장을 분석하고 직무에 맞는 개선 방향을 제안하는 AI 기반 첨삭 서비스입니다.',
    timeline: '00:00 문제 정의 · 00:35 문장 분석 · 01:20 첨삭 결과 · 02:00 개선 요약',
    role:
      'API 설계, 프롬프트 플로우 구성, 결과 비교 UI를 구현해 사용자가 수정 전후를 쉽게 확인할 수 있게 만들었습니다.',
    thumbClass: 'bg-[linear-gradient(135deg,#6771E0,#9FA8FF)]',
    img: '/img/portpolio2/drug_main.png',
    progress: 44,
    githubUrl:'https://github.com/bomi6231835-jpg/Drug_main.git',
    deployUrl:'https://huggingface.co/spaces/yeyeon/Drug_main',
    pdfUrl: '/pdfs/drug-main.pdf',
  },
  {
    title: '필름 아티크',
    eyebrow: '영화예매 사이트',
    meta: 'UPLOAD 2026.04.07',
    category: 'APP · TEAM PROJECT',
    duration: '04:08',
    type: '매운 짬뽕',
    roleTitle: 'Flask Web Site',
    stack: ['Falsk', 'HTML', 'BootStrap', 'index.css', 'Figma'],
    summary:
      '출퇴근 기록, 휴가 신청, 관리자 승인 흐름을 모바일 환경에 맞춰 정리한 근태관리 앱입니다.',
    timeline: '00:00 홈 화면 · 00:40 출퇴근 기록 · 01:35 휴가 신청 · 03:10 관리자 승인',
    role:
      '앱 화면 구조와 상태 관리를 담당하고, Firebase 연동을 통해 실시간 승인 상태가 반영되도록 구현했습니다.',
    thumbClass: 'bg-[linear-gradient(135deg,#565FC7,#808DFD)]',
    img: '/img/portpolio2/film.png',
    progress: 52,
    githubUrl:'https://github.com/bomi6231835-jpg/movie_260407.git',
    deployUrl:'http://127.0.0.1:5000',
    pdfUrl: '/pdfs/filmatique.pdf',
  },
  {
    title: 'OpenAPI 인터넷 서점',
    eyebrow: 'Booklover',
    meta: 'UPLOAD 2026.03.19',
    category: 'UI · UX',
    duration: '01:52',
    type: '조예연',
    roleTitle: '카카오 API 활용하기',
    stack: ['HTML', 'RestAPI', 'index.css', 'Javascript','Figma'],
    summary:
      '반복되는 UI 패턴을 컴포넌트 단위로 정리하고, 화면 제작 속도를 높이기 위한 디자인 시스템 작업입니다.',
    timeline: '00:00 토큰 정의 · 00:30 컴포넌트 설계 · 01:05 문서화 · 01:35 적용 사례',
    role:
      '컬러, 타이포그래피, 버튼, 카드 규칙을 정리하고 Storybook 문서와 React 컴포넌트를 함께 구성했습니다.',
    thumbClass: 'bg-[linear-gradient(135deg,#A6AEFF,#E9ECFF)]',
    img: '/img/portpolio2/bookstore.png',
    progress: 61,
    githubUrl:'https://github.com/bomi6231835-jpg/bookstore_260319.git',
    deployUrl:'https://bomi6231835-jpg.github.io/bookstore_260319/',
    pdfUrl: '/pdfs/bookstore.pdf',
  },
]

const themeStyles = {
  light: {
    '--watch-bg': '#E9ECFF',
    '--watch-card': '#FFFFFF',
    '--watch-card-soft': '#F8F9FF',
    '--watch-accent': '#808DFD',
    '--watch-accent-dark': '#6771E0',
    '--watch-accent-soft': '#DADDFF',
    '--watch-border': '#D3D8FF',
    '--watch-text': '#111111',
    '--watch-muted': '#5B5F73',
    '--watch-faint': '#8A8DA3',
    '--watch-header': 'rgba(233,236,255,0.9)',
    '--watch-shadow': '0 24px 60px rgba(103,113,224,0.18)',
    '--watch-desc': 'rgba(255,255,255,0.92)',
    '--watch-desc-border': '#D8DCF8',
    '--watch-desc-shell': '#F1F3FF',
    '--watch-info-bg': 'var(--color-primary-light)',
    '--watch-info-text': 'var(--color-text)',
    '--watch-side-hover-bg': '#FFFFFF',
  },
  dark: {
    '--watch-bg': '#1D1E3A',
    '--watch-card': '#262846',
    '--watch-card-soft': '#20223F',
    '--watch-accent': '#808DFD',
    '--watch-accent-dark': '#6771E0',
    '--watch-accent-soft': 'rgba(157,166,255,0.18)',
    '--watch-border': 'rgba(211,216,255,0.18)',
    '--watch-text': '#F6F7FF',
    '--watch-muted': '#B7BEDC',
    '--watch-faint': '#8F96BC',
    '--watch-header': 'rgba(29,30,58,0.9)',
    '--watch-shadow': '0 24px 70px rgba(0,0,0,0.32)',
    '--watch-desc': 'rgba(38,40,70,0.94)',
    '--watch-desc-border': 'rgba(211,216,255,0.2)',
    '--watch-desc-shell': 'rgba(23,24,48,0.5)',
    '--watch-info-bg': 'var(--color-primary)',
    '--watch-info-text': '#FFFFFF',
    '--watch-side-hover-bg': '#000000',
  },
}

function Portpolio2() {
  const [activeProject, setActiveProject] = useState(0)
  const homeScrollLockRef = useRef(false)
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light'
  })

  const project = projects[activeProject]
  const pageTitle = useMemo(() => `VIDU - ${project.title}`, [project.title])

  useEffect(() => {
    const previousTitle = document.title
    document.title = pageTitle

    return () => {
      document.title = previousTitle
    }
  }, [pageTitle])

  useEffect(() => {
    localStorage.setItem('portfolio-theme', themeMode)
  }, [themeMode])

  const handleThemeToggle = () => {
    setThemeMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light'))
  }

  const exitPortfolio = () => {
    if (homeScrollLockRef.current) return

    homeScrollLockRef.current = true
    window.dispatchEvent(new CustomEvent('portfolio:exit-to-home'))

    window.setTimeout(() => {
      homeScrollLockRef.current = false
    }, 1900)
  }

  const handlePortfolioWheel = (event) => {
    if (event.deltaY <= 0) return

    const scrollArea = event.currentTarget
    const isAtBottom =
      scrollArea.scrollTop + scrollArea.clientHeight >= scrollArea.scrollHeight - 2

    if (isAtBottom) exitPortfolio()
  }

  return (
    <div
      className="h-full min-h-0 w-full overflow-y-scroll overscroll-contain bg-[var(--watch-bg)] font-['Nanum_Gothic','Noto_Sans_KR',system-ui,sans-serif] text-[var(--watch-text)] antialiased [scrollbar-gutter:stable] transition-colors duration-300"
      style={themeStyles[themeMode]}
      onWheel={handlePortfolioWheel}
    >
      <WatchHeader
        project={project}
        themeMode={themeMode}
        onThemeToggle={handleThemeToggle}
      />

      <main className="mx-auto grid w-full max-w-[1920px] grid-cols-[minmax(0,1fr)_360px] gap-6 px-8 pb-20 pt-6 max-[980px]:grid-cols-1 max-[620px]:px-4">
        <section className="min-w-0">
          <VideoStage project={project} />
          <ProjectMeta project={project} />
        </section>

        <UpNext
          projects={projects}
          activeProject={activeProject}
          onProjectSelect={setActiveProject}
        />
      </main>
      <Footer />
    </div>
  )
}

function WatchHeader({ project, themeMode, onThemeToggle }) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  useEffect(() => {
    if (!isEmailModalOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsEmailModalOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isEmailModalOpen])

  return (
    <header className="sticky top-0 z-[100] flex h-14 items-center justify-between gap-4 border-b border-[var(--watch-border)] bg-[var(--watch-header)] px-6 backdrop-blur-[10px] max-[760px]:h-auto max-[760px]:flex-wrap max-[760px]:py-3">
      <div className="flex items-center gap-3">
        <ThemeSwitch themeMode={themeMode} onThemeToggle={onThemeToggle} />
        <a
          className="flex items-center gap-2 font-['Space_Mono',monospace] text-[19px] font-bold tracking-normal"
          href="#"
          aria-label="VIDU home"
        >
          <span className="h-[9px] w-[9px] rounded-full bg-[#FF4D4D] shadow-[0_0_0_3px_rgba(255,77,77,0.15)]" />
          <span>VIDU</span>
        </a>
      </div>

      <form
        className="mx-4 flex h-9 max-w-[520px] flex-1 items-center gap-2.5 rounded-full border border-[var(--watch-border)] bg-[var(--watch-card)] px-4 text-sm text-[var(--watch-faint)] max-[760px]:order-3 max-[760px]:mx-0 max-[760px]:w-full max-[760px]:max-w-none max-[760px]:flex-none"
        role="search"
        onSubmit={handleSubmit}
      >
        <SearchIcon className="h-[15px] w-[15px]" />
        <label className="sr-only" htmlFor="vidu-search">
          프로젝트 검색
        </label>
        <input
          id="vidu-search"
          className="min-w-0 flex-1 bg-transparent text-[var(--watch-text)] outline-none placeholder:text-[var(--watch-faint)]"
          type="search"
          placeholder={project.title.replace(/\s+/g, ' ')}
        />
      </form>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--watch-accent)] px-4 py-2 text-[13px] font-bold text-white"
            type="button"
            aria-expanded={isEmailModalOpen}
            aria-controls="email-contact-modal"
            onClick={() => setIsEmailModalOpen((isOpen) => !isOpen)}
          >
            <MailIcon className="h-3.5 w-3.5" />
            이메일 보기
          </button>

          {isEmailModalOpen && (
            <div
              id="email-contact-modal"
              role="dialog"
              aria-label="이메일 연락처"
              className="absolute right-0 top-[calc(100%+10px)] z-[110] w-[270px] rounded-xl border border-[var(--watch-border)] bg-[var(--watch-card)] p-4 text-[var(--watch-text)] shadow-[0_14px_35px_rgba(0,0,0,0.2)]"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-black">조예연</p>
                <button
                  className="grid h-6 w-6 cursor-pointer place-items-center rounded-full text-base leading-none text-[var(--watch-muted)] hover:bg-[var(--watch-card-soft)]"
                  type="button"
                  aria-label="이메일 창 닫기"
                  onClick={() => setIsEmailModalOpen(false)}
                >
                  ×
                </button>
              </div>
              <div className="space-y-2 text-xs leading-relaxed">
                <p>
                  <span className="font-bold">구글메일:</span>{' '}
                  <a
                    className="hover:text-[var(--watch-accent-dark)] hover:underline"
                    href="mailto:bomi6231835@gmail.com"
                  >
                    bomi6231835@gmail.com
                  </a>
                </p>
                <p>
                  <span className="font-bold">네이버메일:</span>{' '}
                  <a
                    className="hover:text-[var(--watch-accent-dark)] hover:underline"
                    href="mailto:bomi1835@naver.com"
                  >
                    bomi1835@naver.com
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex h-9 min-w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--watch-accent),#B4BBFF)] px-2 font-['Space_Mono',monospace] text-[13px] font-bold text-white">
          Yeon
        </div>
      </div>
    </header>
  )
}

function ThemeSwitch({ themeMode, onThemeToggle }) {
  return (
    <button
      className="flex h-8 w-[86px] cursor-pointer items-center rounded-full border border-[var(--watch-border)] bg-[var(--watch-card)] p-1 text-xs font-black"
      type="button"
      role="switch"
      aria-checked={themeMode === 'dark'}
      aria-label="Light and dark mode toggle"
      onClick={onThemeToggle}
    >
      <span
        className={`grid h-6 w-[38px] place-items-center rounded-full transition-all duration-300 ${themeMode === 'dark'
          ? 'translate-x-10 bg-[var(--watch-accent)] text-white'
          : 'translate-x-0 bg-[var(--watch-accent-dark)] text-white'
          }`}
      >
        {themeMode === 'dark' ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}

function VideoStage({ project }) {
  return (
    <div className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#565FC7_0%,#808DFD_45%,#C6CBFF_100%)] shadow-[var(--watch-shadow)]">
      <img
        className="absolute inset-0 h-full w-full object-contain"
        src={project.img}
        alt={`${project.title} 프로젝트 미리보기`}
        onError={(event) => {
          event.currentTarget.hidden = true
        }}
      />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.08)_0_2px,transparent_2px_26px)]" />
      <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-md bg-black/55 px-2.5 py-1.5 font-['Space_Mono',monospace] text-xs font-bold tracking-[0.5px] text-white">
        <span className="h-[7px] w-[7px] rounded-full bg-[#FF4D4D]" />
        DEMO PLAY
      </div>

      <button
        className="relative z-10 flex h-[84px] w-[84px] cursor-pointer items-center justify-center rounded-full bg-white/95 text-[#111111] shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition-transform duration-200 group-hover:scale-105"
        type="button"
        aria-label={`${project.title} 재생`}
      >
        <PlayIcon className="h-[30px] w-[30px] translate-x-0.5 fill-current" />
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-5 bg-[linear-gradient(to_top,rgba(0,0,0,0.62),transparent)] px-[18px] pb-3.5 pt-[26px] opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="relative mb-3 h-1 rounded bg-white/35">
          <div
            className="relative h-full rounded bg-[var(--watch-accent)] after:absolute after:right-[-5px] after:top-1/2 after:h-3 after:w-3 after:-translate-y-1/2 after:rounded-full after:bg-white after:content-['']"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button type="button" aria-label="일시정지">
              <PauseIcon className="h-4 w-4" />
            </button>
            <span className="font-['Space_Mono',monospace] text-xs">
              01:22 / {project.duration}
            </span>
          </div>
          <button type="button" aria-label="전체 화면">
            <FullscreenIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function ProjectMeta({ project }) {
  return (
    <>
      <div className="mb-[18px] mt-5 flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-[22px] font-black leading-[1.35]">
          {project.title}
        </h1>
        <div className="hidden flex-wrap items-center gap-3.5 font-['Space_Mono',monospace] text-[12.5px] text-[var(--watch-muted)]">
          <span>{project.meta}</span>
          <span className="text-[var(--watch-border)]">·</span>
          <span>{project.category}</span>
          <span className="text-[var(--watch-border)]">·</span>
          <span>{project.duration}</span>
        </div>
        <div className="hidden flex-wrap items-center gap-3.5 font-['Space_Mono',monospace] text-[12.5px] text-[var(--watch-muted)]">
          <span>{project.meta}</span>
          <span className="text-[var(--watch-border)]">·</span>
          <span>{project.category}</span>
          <span className="text-[var(--watch-border)]">·</span>
          <span>{project.duration}</span>
        </div>
        <div className="flex gap-2.5">
          <ActionButton icon={<LikeIcon className="h-3.5 w-3.5" />}>
            추천
          </ActionButton>
          <ActionButton icon={<ShareIcon className="h-3.5 w-3.5" />}>
            공유
          </ActionButton>
          {project.pdfUrl && (
            <a
              className="flex items-center gap-1.5 rounded-full border border-[var(--watch-accent)] bg-[var(--watch-accent)] px-4 py-[9px] text-[13px] font-bold text-white"
              href={project.pdfUrl}
              target="_blank"
              rel="noreferrer"
            >
              PDF 보기
            </a>
          )}
        </div>
      </div>

      <ProjectDescriptionCard project={project} />
    </>
  )
}

function ProjectDescriptionCard({ project }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--watch-desc-border)] bg-[var(--watch-desc)] shadow-[var(--watch-shadow)] backdrop-blur-sm transition-colors duration-300">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--watch-border)] px-8 py-6 max-[620px]:flex-col max-[620px]:items-start max-[620px]:px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 min-w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--watch-accent),#B4BBFF)] px-2 font-['Space_Mono',monospace] text-[13px] font-bold text-white">
            Yeon
          </div>
          <div>
            <p className="text-base font-bold text-[var(--watch-text)]">
              Yeon 개발 채널
            </p>
            <p className="mt-0.5 text-sm text-[var(--watch-faint)]">
              프로젝트 12개 · 포트폴리오 업데이트
            </p>
          </div>
        </div>
        <a
          className="grid h-8 place-items-center rounded-lg border border-[var(--watch-accent)] px-3.5 text-sm font-bold text-[var(--color-primary)] transition-colors hover:bg-[var(--watch-card-soft)]"
          href="mailto:hello@vidu.dev"
        >
          홈으로
        </a>
      </div>

      <div className="px-8 py-6 max-[620px]:px-5">
        <div className="mb-6 flex gap-4 overflow-x-auto pb-2">
          <SummaryItem
            icon={<CalendarIcon className="h-3.5 w-3.5" />}
            label="기간"
            value={project.duration}
          />
          <SummaryItem
            icon={<UsersIcon className="h-3.5 w-3.5" />}
            label="유형"
            value={project.type}
          />
          <SummaryItem
            icon={<CodeIcon className="h-3.5 w-3.5" />}
            label="역할"
            value={project.roleTitle}
          />
        </div>

        <div className="mb-6 flex flex-wrap gap-2.5">
          {project.stack.map((tag) => (
            <span
              className="rounded-md bg-[white] border border-[var(--watch-accent-dark)] px-2.5 py-1 font-['Space_Mono',monospace] text-sm font-bold text-[var(--watch-accent-dark)]"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mb-6 border-l-2 border-[var(--watch-accent)] pl-3.5">
          <p className="mb-2 flex items-center gap-1.5 text-base font-bold text-[var(--color-primary)]">
            <FileTextIcon className="h-3.5 w-3.5" />
            프로젝트 개요
          </p>
          <p className="whitespace-pre-line text-[15px] leading-[1.85] text-[var(--watch-text)]">
            {project.summary}
          </p>
        </div>

        <div className="mb-6">
          <p className="mb-2.5 flex items-center gap-1.5 text-base font-bold text-[var(--color-primary)]">
            <ClockIcon className="h-3.5 w-3.5" />
            영상 구성
          </p>
          <TimelineList timeline={project.timeline} />
        </div>

        <div className="mb-6 border-l-2 border-[var(--watch-accent)] pl-3.5">
          <div className="mb-6">
            <p className="mb-2 flex items-center gap-1.5 text-base font-bold text-[var(--color-primary)]">
              <UsersIcon className="h-3.5 w-3.5" />
              담당 역할
            </p>
            <p className="whitespace-pre-line text-[15px] leading-[1.85] text-[var(--watch-text)]">
              {project.role}
            </p>
          </div>
        </div>

        {(project.githubUrl || project.deployUrl) && (
          <div className="flex gap-8 max-[620px]:flex-col">
            {project.githubUrl && (
              <a
                className="flex h-[38px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--watch-border)] bg-[var(--watch-info-bg)] text-sm font-bold text-[var(--watch-text)] transition-colors hover:bg-[var(--watch-info-bg)]"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub 저장소
              </a>
            )}
            {project.deployUrl && (
              <a
                className="flex h-[38px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--watch-border)] bg-[var(--watch-info-bg)] text-sm font-bold text-[var(--watch-text)] transition-colors hover:bg-[var(--watch-info-bg)]"
                href={project.deployUrl}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLinkIcon className="h-4 w-4" />
                배포 링크
              </a>
            )}
          </div>
        )}
      </div>
    </div>

  )
}

function SummaryItem({ icon, label, value }) {
  return (
    <div className="h-20 min-h-20 w-[180px] min-w-[180px] max-w-[180px] shrink-0 rounded-lg gap-3 bg-[var(--watch-info-bg)] px-4 py-3 text-left">
      <p className="mb-3 text-xs tracking-wide text-[var(--watch-info-text)]">
        {label}
      </p>
      <p className="flex min-w-0 items-center gap-1.5 text-base font-bold leading-tight text-[var(--watch-info-text)]">
        <span className="shrink-0 text-[var(--watch-info-text)]">{icon}</span>
        <span className="truncate">{value}</span>
      </p>
    </div>
  )
}

function TimelineList({ timeline }) {
  const items = timeline.split(' · ').map((item) => {
    const [time, ...labelParts] = item.split(' ')
    return { time, label: labelParts.join(' ') }
  })

  return (
    <div className="flex flex-col gap-2.5">
      {items.map(({ time, label }) => (
        <div className="flex items-center gap-3 text-[15px]" key={`${time}-${label}`}>
          <span className="min-w-[56px] font-['Space_Mono',monospace] text-xs text-[var(--watch-faint)]">
            {time}
          </span>
          <span className="leading-[1.65] text-[var(--watch-text)]">{label}</span>
        </div>
      ))}
    </div>
  )
}

function ActionButton({ children, icon, isPrimary = false }) {
  return (
    <button
      className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-[9px] text-[13px] font-bold ${isPrimary
        ? 'border-[var(--watch-accent)] bg-[var(--watch-accent)] text-white'
        : 'border-[var(--watch-border)] bg-[var(--watch-card)] text-[var(--watch-text)] hover:border-[var(--watch-accent)] hover:text-[var(--watch-accent-dark)]'
        }`}
      type="button"
    >
      {icon}
      {children}
    </button>
  )
}

function UpNext({ projects, activeProject, onProjectSelect }) {
  return (
    <aside className="min-w-0">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="pl-1.5 text-[15px] font-black">다음 프로젝트</h2>
        <span className="text-xs text-[var(--color-primary-light)] ">
          최신순
        </span>
      </div>

      {projects.slice(0, 4).map((project, index) => {
        const isActive = activeProject === index

        return (
          <button
            className="mb-3 flex w-full cursor-pointer gap-3 rounded-xl border border-transparent bg-transparent p-2 text-left transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--watch-side-hover-bg)]"
            key={project.title}
            type="button"
            aria-pressed={isActive}
            onClick={() => onProjectSelect(index)}
          >
            <div
              className={`relative aspect-video w-[136px] shrink-0 overflow-hidden rounded-[10px] ${project.thumbClass} ${isActive ? 'outline outline-2 outline-offset-2 outline-[var(--watch-accent)]' : ''
                }`}
            >
              <img
                className="h-full w-full object-contain"
                src={project.img}
                alt=""
                onError={(event) => {
                  event.currentTarget.hidden = true
                }}
              />
              <span className="absolute bottom-1.5 right-1.5 rounded bg-black/75 px-1.5 py-0.5 font-['Space_Mono',monospace] text-xs text-white">
                {project.duration}
              </span>
            </div>
            <div className="flex min-w-0 flex-col justify-center">
              <div
                className={`mb-1 line-clamp-2 whitespace-pre-line text-[13.5px] font-bold leading-[1.4] ${isActive ? 'text-[var(--watch-accent-dark)]' : 'text-[var(--watch-text)]'
                  }`}
              >
                {project.title}
              </div>
              <div className="text-xs text-[var(--watch-muted)]">
                {isActive ? '재생 중' : project.eyebrow}
              </div>
              <div className="mt-0.5 font-['Space_Mono',monospace] text-xs text-[var(--watch-faint)]">
                {project.stack.slice(0, 2).join(' · ')}
              </div>
            </div>
          </button>
        )
      })}
    </aside>
  )
}

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function MailIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6h16v12H4V6Zm0 1 8 6 8-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function PlayIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function PauseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 5v14M15 5v14" stroke="currentColor" strokeLinecap="round" strokeWidth="2.4" />
    </svg>
  )
}

function FullscreenIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function LikeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function ShareIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 13v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7M15 3h6v6M10 14 21 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function CalendarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 2v4M16 2v4M3 10h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function UsersIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function CodeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m16 18 6-6-6-6M8 6l-6 6 6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function FileTextIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function ClockIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function ExternalLinkIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export default Portpolio2
