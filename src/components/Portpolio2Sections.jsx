import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

function WatchHeader({ project, themeMode, onThemeToggle, onLogoClick }) {
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
    <header className="sticky top-0 z-[100] flex h-14 items-center justify-between gap-4 border-b border-[var(--watch-border)] bg-[var(--watch-header)] px-6 backdrop-blur-[10px] max-[1100px]:gap-2 max-[760px]:h-auto max-[760px]:flex-wrap max-[760px]:py-3">
      <div className="flex shrink-0 items-center gap-3">
        <ThemeSwitch themeMode={themeMode} onThemeToggle={onThemeToggle} />
        <button
          type="button"
          className="cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--watch-accent)]"
          aria-label="Portpolio2 상단으로 이동"
          onClick={onLogoClick}
        >
          <img
            className="ml-10 h-auto w-30 object-contain"
            src={
              themeMode === 'dark'
                ? '/img/logo_light.png'
                : '/img/logo_dark.png'
            }
            alt="VIDU"
          />
        </button>
      </div>

      <form
        className="mx-0 flex h-9 min-w-0 max-w-[500px] flex-1 items-center gap-2 rounded-full border border-[var(--watch-border)] bg-[var(--watch-card)] px-4 text-sm text-[var(--watch-faint)] max-[1100px]:mx-0 max-[760px]:order-3 max-[760px]:w-full max-[760px]:max-w-none max-[760px]:flex-none"
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

      <div className="flex shrink-0 items-center gap-4">
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

function ProjectMeta({
  project,
  likeCount,
  onSeek,
  onLike,
  onNavigateHome,
  themeMode,
}) {
  return (
    <>
      <div className="mb-[18px] mt-5 flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-x-7 gap-y-1.5">
          <h1 className="ml-19 mb-3 text-[30px] font-black leading-[1.35]">
            {project.title}
          </h1>
          <span className="flex shrink-0 items-center gap-1.5 font-['-apple-system',BlinkMacSystemFont] text-sm font-bold text-[var(--watch-muted)]"> 기간
            <CalendarIcon className="h-3.5 w-3.5" />
            {project.duration}
          </span>
        </div>
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
          <ActionButton
            icon={<LikeIcon className="h-3.5 w-3.5" />}
            onClick={onLike}
          >
            추천
            <span
              className="min-w-4 text-center font-['Space_Mono',monospace]"
              aria-live="polite"
            >
              {likeCount}
            </span>
          </ActionButton>

          {project.pdfUrl ? (
            <a
              className="flex items-center gap-1.5 rounded-full border border-[var(--watch-accent)] bg-[var(--watch-accent)] px-4 py-[9px] text-[13px] font-bold text-white"
              href={project.pdfUrl}
              target="_blank"
              rel="noreferrer"
            >
              PDF 보기
            </a>
          ) : (
            <button
              className="flex cursor-not-allowed items-center gap-1.5 rounded-full border border-[var(--watch-border)] bg-[var(--watch-info-bg)] px-4 py-[9px] text-[13px] font-bold text-[var(--watch-muted)] opacity-45"
              type="button"
              disabled
            >
              PDF 없음
            </button>
          )}
        </div>
      </div>

      <ProjectDescriptionCard
        onSeek={onSeek}
        project={project}
        onNavigateHome={onNavigateHome}
        themeMode={themeMode}
      />
    </>
  )
}

function ProjectDescriptionCard({ project, onNavigateHome, themeMode, onSeek }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--watch-desc-border)] bg-[var(--watch-desc)] shadow-[var(--watch-shadow)] backdrop-blur-sm transition-colors duration-300">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--watch-border)] px-8 py-6 max-[620px]:flex-col max-[620px]:items-start max-[620px]:gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 min-w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--watch-accent),#B4BBFF)] px-2 font-['Space_Mono',monospace] text-[13px] font-bold text-white">
            Yeon
          </div>
          <div>
            <p className="text-base font-bold text-[var(--watch-text)]">
              Yeon 개발 채널
            </p>
            <p className="mt-0.5 text-sm text-[var(--watch-faint)]">
              프로젝트 5개 · 포트폴리오
            </p>
          </div>
        </div>
        <button
          type="button"
          className="grid h-8 place-items-center rounded-lg border border-[var(--watch-accent)] px-3.5 text-sm font-bold text-[var(--color-primary)] transition-colors hover:bg-[var(--watch-card-soft)]
          cursor-pointer"
          onClick={onNavigateHome}
        >
          홈으로
        </button>
      </div>

      <div className="px-8 py-6 max-[620px]:px-5">
        <div className="mb-6 flex gap-4 overflow-x-auto pb-2">
          <SummaryItem
            icon={<ClockIcon className="h-3.5 w-3.5" />}
            label="영상 길이"
            value={project.video_time}
          />
          <SummaryItem
            icon={<CodeIcon className="h-3.5 w-3.5" />}
            label="유형"
            value={project.type}
            key={project.type}
            expandable
            themeMode={themeMode}
          />
          <SummaryItem
            icon={<UsersIcon className="h-3.5 w-3.5" />}
            label="팀이름"
            value={project.roleTitle}
            key={project.roleTitle}
            expandable
            themeMode={themeMode}
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
          <TimelineList timeline={project.timeline} onSeek={project.youtubeId ? onSeek : undefined} />
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

        {project.githubUrl || project.deployUrl ? (
          <div className="flex gap-8 max-[620px]:flex-col max-[620px]:items-center max-[620px]:gap-3">
            {project.githubUrl && (
              <a
                className="flex h-[38px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--watch-border)] bg-[var(--watch-info-bg)] text-sm font-bold text-[var(--watch-text)] transition-colors hover:bg-[var(--watch-info-bg)] max-[620px]:w-40 max-[620px]:flex-none"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon className="h-4 w-5" />
                GitHub 저장소
              </a>
            )}
            {project.deployUrl && (
              <a
                className="flex h-[38px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--watch-border)] bg-[var(--watch-info-bg)] text-sm font-bold text-[var(--watch-text)] transition-colors hover:bg-[var(--watch-info-bg)] max-[620px]:w-40 max-[620px]:flex-none"
                href={project.deployUrl}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLinkIcon className="h-4 w-5" />
                배포 링크
              </a>
            )}
          </div>
        ) : (
          <div className="flex h-[38px] cursor-default items-center justify-center rounded-lg border border-[var(--watch-border)] bg-[var(--watch-info-bg)] px-4 text-sm font-bold text-[var(--watch-muted)] opacity-50">
            영상 포트폴리오 · 외부 링크 없음
          </div>
        )}
      </div>
    </div>

  )
}

function SummaryItem({
  icon,
  label,
  value,
  expandable = false,
  themeMode,
}) {
  const [popoverPosition, setPopoverPosition] = useState(null)
  const buttonRef = useRef(null)
  const popoverRef = useRef(null)
  const popoverId = useId()
  const isExpanded = popoverPosition !== null

  const handleToggle = (event) => {
    if (isExpanded) {
      setPopoverPosition(null)
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    const viewportPadding = 8
    const popoverWidth = Math.min(288, window.innerWidth - viewportPadding * 2)
    const halfPopoverWidth = popoverWidth / 2
    const centeredLeft = bounds.left + bounds.width / 2
    const left = Math.min(
      Math.max(centeredLeft, viewportPadding + halfPopoverWidth),
      window.innerWidth - viewportPadding - halfPopoverWidth,
    )
    const shouldOpenAbove = bounds.top >= 150

    setPopoverPosition({
      left,
      top: shouldOpenAbove ? bounds.top - 8 : bounds.bottom + 8,
      placement: shouldOpenAbove ? 'above' : 'below',
    })
  }

  useEffect(() => {
    if (!isExpanded) return undefined

    const closePopover = () => setPopoverPosition(null)
    const handlePointerDown = (event) => {
      if (
        buttonRef.current?.contains(event.target) ||
        popoverRef.current?.contains(event.target)
      ) {
        return
      }

      closePopover()
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closePopover()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', closePopover)
    window.addEventListener('scroll', closePopover, true)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', closePopover)
      window.removeEventListener('scroll', closePopover, true)
    }
  }, [isExpanded])

  return (
    <div className="h-20 min-h-20 w-[180px] min-w-[180px] max-w-[180px] shrink-0 rounded-lg bg-[var(--watch-info-bg)] px-4 py-3 text-left">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-xs tracking-wide text-[var(--watch-info-text)]">
          {label}
        </p>
        {expandable && (
          <button
            ref={buttonRef}
            type="button"
            className={`shrink-0 cursor-pointer text-[11px] font-bold underline decoration-current/50 underline-offset-2 transition-opacity hover:opacity-70 ${themeMode === 'dark'
                ? 'text-[var(--color-primary-light)]'
                : 'text-[gray]'
              }`}
            aria-expanded={isExpanded}
            aria-controls={popoverId}
            onClick={handleToggle}
          >
            {isExpanded ? '접기' : '펼치기'}
          </button>
        )}
      </div>
      <p className="flex min-w-0 items-center gap-1.5 text-base font-bold leading-tight text-[var(--watch-info-text)]">
        <span className="shrink-0 text-[var(--watch-info-text)]">{icon}</span>
        <span className="truncate">{value}</span>
      </p>

      {isExpanded &&
        createPortal(
          <div
            ref={popoverRef}
            id={popoverId}
            className={`fixed z-[300] w-[min(18rem,calc(100vw-1rem))] rounded-2xl border p-4 text-left shadow-[0_16px_40px_rgba(0,0,0,0.24)] ${themeMode === 'dark'
                ? 'border-white/15 bg-[#25213D] text-white'
                : 'border-black/10 bg-white text-[#2D2747]'
              }`}
            style={{
              left: popoverPosition.left,
              top: popoverPosition.top,
              transform:
                popoverPosition.placement === 'above'
                  ? 'translate(-50%, -100%)'
                  : 'translateX(-50%)',
            }}
            role="dialog"
            aria-label={`${label} 전체 내용`}
          >
            <p className="text-xs font-bold tracking-wide text-[var(--color-primary)]">
              {label}
            </p>
            <p className="mt-2 break-words text-sm font-bold leading-relaxed">
              {value}
            </p>
          </div>,
          document.body,
        )}
    </div>
  )
}

function TimelineList({ timeline, onSeek }) {
  const items = timeline.split(' · ').map((item) => {
    const [time, ...labelParts] = item.split(' ')
    const seconds = /^\d+:[0-5]\d$/.test(time)
      ? time.split(':').reduce((total, part) => total * 60 + Number(part), 0)
      : null
    return { time, seconds, label: labelParts.join(' ') }
  })

  return (
    <div className="flex flex-col gap-2.5">
      {items.map(({ time, seconds, label }) => (
        <div className="flex items-center gap-3 text-[15px]" key={`${time}-${label}`}>
          <button
            type="button"
            disabled={!onSeek || seconds === null}
            onClick={() => onSeek?.(seconds)}
            aria-label={`${time} ${label}부터 재생`}
            className="min-w-[56px] cursor-pointer rounded text-left font-['Space_Mono',monospace] text-xs text-[var(--watch-accent-dark)] underline underline-offset-4 hover:text-[var(--watch-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--watch-accent)] disabled:cursor-default disabled:text-[var(--watch-faint)] disabled:no-underline"
          >
            {time}
          </button>
          <span className="leading-[1.65] text-[var(--watch-text)]">{label}</span>
        </div>
      ))}
    </div>
  )
}

function ActionButton({ children, icon, isPrimary = false, onClick }) {
  return (
    <button
      className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-[9px] text-[13px] font-bold ${isPrimary
        ? 'border-[var(--watch-accent)] bg-[var(--watch-accent)] text-white'
        : 'border-[var(--watch-border)] bg-[var(--watch-card)] text-[var(--watch-text)] hover:border-[var(--watch-accent)] hover:text-[var(--watch-accent-dark)]'
        }`}
      type="button"
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  )
}

function UpNext({ projects, activeProject, onProjectSelect, themeMode }) {
  return (
    <aside className="sticky top-20 min-w-0 self-start max-[980px]:static">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="pl-1.5 text-[15px] font-black">다음 프로젝트</h2>
        <span
          className={`text-xs ${themeMode === 'dark'
              ? 'text-[var(--color-primary-light)]'
              : 'text-[#6B7280]'
            }`}
        >
          최신순
        </span>
      </div>

      {projects.slice(0, 5).map((project, index) => {
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
                {project.video_time}
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

function ClockIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 7v5l3.5 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { ProjectMeta, UpNext, WatchHeader }
