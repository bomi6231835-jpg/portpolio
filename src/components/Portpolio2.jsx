import { useEffect, useRef, useState } from 'react'
import Footer from './Footer'
import { VideoStage } from './Portpolio2Player'
import { ProjectMeta, UpNext, WatchHeader } from './Portpolio2Sections'


const projects = [
  {
    title: '오늘 뭐먹지?',
    eyebrow: 'React Team Project',
    meta: 'UPLOAD 2026.07.28',
    category: 'WEB · TEAM PROJECT',
    duration: '06.19 - 07.27',
    video_time: '05:32',
    type: 'AI 맞춤 식당 추천 & 함께하는 식사 파티 플랫폼',
    roleTitle: '오늘 뭐먹지',
    stack: ['React', 'Flask', 'Tailwind', 'WebSocket', 'API', 'Figma'],
    summary:
      'AI가 사용자의 실시간 취향을 분석해 식당을 추천하고, 같은 음식을 원하는 사용자들과 파티를 만들어 함께 식사할 수 있는 웹 서비스입니다',
    timeline:
      '00:00 홈 화면 · 01:07 파티만들기 · 01:46 관리자 페이지 · 02:26 고객의 취향분석-AI · 03:25 마이페이지',
    role:
      '프론트엔드 리드를 맡아 서비스의 테마 컬러를 선정하고, 메인 페이지, 식당 검색 페이지, 마이페이지 등 주요 화면의 UI 구현을 담당했습니다.',
    thumbClass: 'bg-[linear-gradient(135deg,#808DFD,#C6CBFF)]',
    img: '/img/portpolio2/today-menu.png',
    youtubeId:'nBdDwN8YKBc',
    githubUrl: 'https://github.com/bomi6231835-jpg/today-menu.git',
    deployUrl: 'https://today-menu-git-main-sdhuen01-3018s-projects.vercel.app',
    pdfUrl: '/pdfs/today-menu.pdf',

  },
  {
    title: '서울시 의약품 수요예측\n및 재고관리',
    eyebrow: '허깅페이스 배포',
    meta: 'UPLOAD 2026.06.19',
    category: 'AI · DATA',
    duration: '06.19 - 07.27',
    video_time: '01:21',
    type: '머신러닝 · 스트림릿 · 허깅 페이스',
    roleTitle: '도라에몽의약주머니',
    stack: ['Machine Learning', 'Colab', 'LLM', 'Huggingface', 'Streamlit', 'Figma'],
    summary:
      '서울시 의약품 사용량 통계를 기반으로 질병별 의약품 수요를 분석하고, 예상 사용량과 권장 구매 수량을 제공하여 효율적인 재고관리를 지원하는 데이터 분석 프로젝트입니다.',
    timeline: '00:00 홈 화면 · 00:32 머신러닝 모델 선택하기 · 00:44 의약품 수요 예측 결과 · 00:50 의약품 재고 관리',
    role:
      'Google Colab에서 릿지·라쏘 회귀 모델을 활용해 의약품 미래 수요를 예측하고 성능을 비교했으며, 의약품 사용량 통계를 기반으로 가상 재고 데이터를 구축했습니다.',
    thumbClass: 'bg-[linear-gradient(135deg,#6771E0,#9FA8FF)]',
    img: '/img/portpolio2/drug_main.png',
    youtubeId:'VaPiwuFtyPw',
    githubUrl: 'https://github.com/bomi6231835-jpg/Drug_main.git',
    deployUrl: 'https://huggingface.co/spaces/yeyeon/Drug_main',
    pdfUrl: '/pdfs/drug-main.pdf',
  },
  {
    title: '필름 아티크',
    eyebrow: '',
    meta: 'UPLOAD 2026.04.07',
    category: 'APP · TEAM PROJECT',
    duration: '04.06 - 04.29',
    video_time: '03:49',
    type: 'Flask Web Site',
    roleTitle: '매운 짬뽕',
    stack: ['Falsk', 'HTML', 'BootStrap', 'index.css', 'Figma'],
    summary:
      '영화 및 좌석 예매부터 매점·이벤트 굿즈 구매와 결제, 마이페이지, 고객센터 등을 구현한 영화 예매 웹 서비스입니다.',
    timeline: '00:00 홈 화면 · 00:48 영화예매 · 01:09 상품 구매 · 01:44 고객센터 · 02:37 관리자 페이지',
    role:
      'Flask와 HTML·CSS·JavaScript를 활용해 고객센터에 안에 있는 FAQ, 공지사항, 1:1 문의 기능을 구현하고, Seed 파일을 통해 초기 데이터를 구축했습니다.앱 화면 구조와 상태 관리를 담당하고, Firebase 연동을 통해 실시간 승인 상태가 반영되도록 구현했습니다.',
    thumbClass: 'bg-[linear-gradient(135deg,#565FC7,#808DFD)]',
    img: '/img/portpolio2/film.png',
    youtubeId:'0spKBeQZZo8',
    githubUrl: 'https://github.com/bomi6231835-jpg/movie_260407.git',
    deployUrl: 'http://127.0.0.1:5000',
    pdfUrl: '/pdfs/filmatique.pdf',
  },
  {
    title: 'OpenAPI 인터넷 서점',
    eyebrow: 'Booklover',
    meta: 'UPLOAD 2026.03.19',
    category: 'UI · UX',
    duration: '03.16 - 04.02',
    video_time: '01:26',
    type: '카카오 API 활용하기',
    roleTitle: '개인 프로젝트',
    stack: ['HTML', 'RestAPI', 'index.css', 'Javascript', 'Figma'],
    summary:
      '카카오 API를 활용해 도서 데이터를 수집·연동하고, 다양한 도서 정보를 확인하고 구매할 수 있도록 구현한 온라인 서점 웹사이트입니다.',
    timeline: '00:00 홈 화면 · 00:03 카카오 API 활용 · 00:43 서브페이지',
    role:
      '개인 프로젝트로 기획, UI 디자인, 프론트엔드 및 백엔드 개발까지 전 과정을 직접 구현했습니다.',
    thumbClass: 'bg-[linear-gradient(135deg,#A6AEFF,#E9ECFF)]',
    img: '/img/portpolio2/bookstore.png',
    youtubeId: 'tsAniz4vDIo',
    githubUrl: 'https://github.com/bomi6231835-jpg/bookstore_260319.git',
    deployUrl: 'https://bomi6231835-jpg.github.io/bookstore_260319/',
    pdfUrl: '/pdfs/bookstore.pdf',
  },
  {
    title:'수원 디지털 스페이스 홍보영상',
    eyebrow:'수원 디지털 스페이스 공모전 홍보영상',
    meta:'UPLOAD 2022.11.29',
    category:'Video_Edit',
    duration:'22.10.25 - 22.11.15',
    video_time:'02:02',
    type:'홍보부문 우수상 수상',
    roleTitle:'개인 프로젝트',
    stack: ['After Effects', 'Premiere Pro'],
    summary: '촬영장비, 스튜디오 장소를 대여해주는 디지털 스페이스 공간을 홍보하는 영상입니다. 디지털 스페이스 공모전에서 홍보부문 우수상을 수상했습니다.',
    timeline: '00:00 시작 · 01:00 대여가능 물품들 · 01:28 디지털스페이스 이용방법',
    role: '기획, 촬영, 편집',
    thumbClass: 'bg-[linear-gradient(135deg,#808DFD,#C6CBFF)]',
    img: '/img/portpolio2/digital_space.png',
    youtubeId: 'T8a0thx6gok',
    githubUrl: '',
    deployUrl: '',
    pdfUrl: '',
  }
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
    '--watch-header': '#25213D',
    '--watch-shadow': '0 24px 70px rgba(0,0,0,0.32)',
    '--watch-desc': 'rgba(38,40,70,0.94)',
    '--watch-desc-border': 'rgba(211,216,255,0.2)',
    '--watch-desc-shell': 'rgba(23,24,48,0.5)',
    '--watch-info-bg': 'var(--color-primary)',
    '--watch-info-text': '#FFFFFF',
    '--watch-side-hover-bg': '#000000',
  },
}

function Portpolio2({ onNavigateHome }) {
  const [activeProject, setActiveProject] = useState(0)
  const [seekRequest, setSeekRequest] = useState(null)
  const seekRequestId = useRef(0)

  const handleTimelineSeek = (seconds) => {
    setSeekRequest({ seconds, id: ++seekRequestId.current })
  }

  const handleProjectSelect = (index) => {
    if (index === activeProject) return
    setSeekRequest(null)
    setActiveProject(index)
  }
  const [likeCounts, setLikeCounts] = useState(() =>
    projects.map(() => 0),
  )
  const homeScrollLockRef = useRef(false)
  const scrollAreaRef = useRef(null)
  const topGestureCountRef = useRef(0)
  const isTopGestureActiveRef = useRef(false)
  const topGestureIdleTimerRef = useRef(null)
  const topGestureResetTimerRef = useRef(null)
  const homeNavigationUnlockTimerRef = useRef(null)
  const isHomeNavigationLockedRef = useRef(false)
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light'
  })

  const project = projects[activeProject]

  useEffect(() => {
    localStorage.setItem('portfolio-theme', themeMode)
  }, [themeMode])

  useEffect(
    () => () => {
      window.clearTimeout(topGestureIdleTimerRef.current)
      window.clearTimeout(topGestureResetTimerRef.current)
      window.clearTimeout(homeNavigationUnlockTimerRef.current)
    },
    [],
  )

  const handleThemeToggle = () => {
    setThemeMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light'))
  }

  const handleLike = () => {
    setLikeCounts((currentCounts) =>
      currentCounts.map((count, index) =>
        index === activeProject ? count + 1 : count,
      ),
    )
  }

  const scrollToPortfolioTop = () => {
    scrollAreaRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const exitPortfolio = () => {
    if (homeScrollLockRef.current) return

    homeScrollLockRef.current = true
    window.dispatchEvent(new CustomEvent('portfolio:exit-to-home'))

    window.setTimeout(() => {
      homeScrollLockRef.current = false
    }, 1900)
  }

  const resetTopGesture = () => {
    topGestureCountRef.current = 0
    isTopGestureActiveRef.current = false
    window.clearTimeout(topGestureIdleTimerRef.current)
    window.clearTimeout(topGestureResetTimerRef.current)
    topGestureIdleTimerRef.current = null
    topGestureResetTimerRef.current = null
  }

  const handlePortfolioWheel = (event) => {
    if (event.defaultPrevented) return

    const scrollArea = event.currentTarget
    const isAtTop = scrollArea.scrollTop <= 2

    if (event.deltaY < 0) {
      if (!isAtTop || isHomeNavigationLockedRef.current) {
        resetTopGesture()
        return
      }

      if (event.cancelable) event.preventDefault()

      window.clearTimeout(topGestureIdleTimerRef.current)
      topGestureIdleTimerRef.current = window.setTimeout(() => {
        isTopGestureActiveRef.current = false
        topGestureIdleTimerRef.current = null
      }, 300)

      if (isTopGestureActiveRef.current) return

      isTopGestureActiveRef.current = true
      topGestureCountRef.current += 1

      if (topGestureCountRef.current === 1) {
        window.clearTimeout(topGestureResetTimerRef.current)
        topGestureResetTimerRef.current = window.setTimeout(() => {
          resetTopGesture()
        }, 2000)
        return
      }

      resetTopGesture()
      isHomeNavigationLockedRef.current = true
      onNavigateHome?.()
      homeNavigationUnlockTimerRef.current = window.setTimeout(() => {
        isHomeNavigationLockedRef.current = false
        homeNavigationUnlockTimerRef.current = null
      }, 1200)
      return
    }

    if (event.deltaY === 0) return

    resetTopGesture()

    const isAtBottom =
      scrollArea.scrollTop + scrollArea.clientHeight >= scrollArea.scrollHeight - 2

    if (isAtBottom) exitPortfolio()
  }

  return (
    <div
      ref={scrollAreaRef}
      data-portfolio-scroll-area
      className="h-full min-h-0 w-full overflow-y-scroll overscroll-contain bg-[var(--watch-bg)] font-['Nanum_Gothic','Noto_Sans_KR',system-ui,sans-serif] text-[var(--watch-text)] antialiased [scrollbar-gutter:stable] transition-colors duration-300"
      style={themeStyles[themeMode]}
      onWheel={handlePortfolioWheel}
    >
      <WatchHeader
        project={project}
        themeMode={themeMode}
        onThemeToggle={handleThemeToggle}
        onLogoClick={scrollToPortfolioTop}
      />

      <main className="mx-auto grid w-full max-w-[1920px] grid-cols-[minmax(0,1fr)_360px] gap-6 px-8 pb-20 pt-6 max-[980px]:grid-cols-1 max-[620px]:px-4">
        <section className="min-w-0">
          <VideoStage key={project.title} project={project} seekRequest={seekRequest} />
          <ProjectMeta
            project={project}
            likeCount={likeCounts[activeProject]}
            onSeek={handleTimelineSeek}
            onLike={handleLike}
            onNavigateHome={onNavigateHome}
            themeMode={themeMode}
          />
        </section>

        <UpNext
          projects={projects}
          activeProject={activeProject}
          onProjectSelect={handleProjectSelect}
          themeMode={themeMode}
        />
      </main>
      <Footer themeMode={themeMode} />
    </div>
  )
}

export default Portpolio2
