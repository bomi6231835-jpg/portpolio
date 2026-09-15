import { useEffect, useRef, useState } from 'react'

let youtubeApiPromise

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (!youtubeApiPromise) {
    youtubeApiPromise = new Promise((resolve, reject) => {
      const previousReady = window.onYouTubeIframeAPIReady
      const script = document.createElement('script')
      const timeout = window.setTimeout(fail, 15000)

      function fail() {
        window.clearTimeout(timeout)
        window.onYouTubeIframeAPIReady = previousReady
        script.remove()
        youtubeApiPromise = undefined
        reject(new Error('YouTube API could not load'))
      }

      window.onYouTubeIframeAPIReady = () => {
        window.clearTimeout(timeout)
        window.onYouTubeIframeAPIReady = previousReady
        resolve(window.YT)
        previousReady?.()
      }
      script.src = 'https://www.youtube.com/iframe_api'
      script.onerror = fail
      document.head.appendChild(script)
    })
  }
  return youtubeApiPromise
}

function VideoStage({ project, seekRequest }) {
  if (project.youtubeId) return <YouTubeVideoStage project={project} seekRequest={seekRequest} />
  return <LocalVideoStage project={project} />
}

function YouTubeVideoStage({ project, seekRequest }) {
  const [hasStarted, setHasStarted] = useState(false)
  const [playerError, setPlayerError] = useState(false)
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  const pendingSeekRef = useRef(null)
  const isReadyRef = useRef(false)
  const shouldShowPlayer = hasStarted || seekRequest !== null && seekRequest !== undefined

  useEffect(() => {
    pendingSeekRef.current = seekRequest
    if (seekRequest && isReadyRef.current && playerRef.current) {
      playerRef.current.seekTo(seekRequest.seconds, true)
      playerRef.current.playVideo()
      pendingSeekRef.current = null
    }
  }, [seekRequest])

  useEffect(() => {
    if (!shouldShowPlayer) return
    let cancelled = false
    let player
    const container = containerRef.current

    loadYouTubeApi().then((YT) => {
      if (cancelled) return
      const iframe = document.createElement('iframe')
      iframe.className = 'absolute inset-0 h-full w-full border-0'
      iframe.src = `https://www.youtube-nocookie.com/embed/${project.youtubeId}?enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}&autoplay=1&playsinline=1&rel=0`
      iframe.title = `${project.title} 프로젝트 영상`
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'
      iframe.allowFullscreen = true
      container.appendChild(iframe)
      player = new YT.Player(iframe, {
        events: {
          onReady: (event) => {
            if (cancelled) return
            playerRef.current = event.target
            isReadyRef.current = true
            const request = pendingSeekRef.current
            if (request) event.target.seekTo(request.seconds, true)
            pendingSeekRef.current = null
            event.target.playVideo()
          },
          onError: () => {
            if (!cancelled) setPlayerError(true)
          },
        },
      })
      playerRef.current = player
    }).catch(() => {
      if (!cancelled) setPlayerError(true)
    })

    return () => {
      cancelled = true
      isReadyRef.current = false
      playerRef.current = null
      player?.destroy()
      container?.replaceChildren()
    }
  }, [shouldShowPlayer, project.youtubeId, project.title])

  return (
    <div className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-black shadow-[var(--watch-shadow)]">
      {shouldShowPlayer ? (
        <div ref={containerRef} className="absolute inset-0" />
      ) : (
        <>
          <img
            className="absolute inset-0 h-full w-full cursor-pointer object-contain"
            src={project.img}
            alt={`${project.title} 프로젝트 미리보기`}
            onClick={() => setHasStarted(true)}
            onError={(event) => {
              event.currentTarget.hidden = true
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.08)_0_2px,transparent_2px_26px)]" />
          <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-md bg-black/55 px-2.5 py-1.5 font-['Space_Mono',monospace] text-xs font-bold tracking-[0.5px] text-white">
            <span className="h-[7px] w-[7px] rounded-full bg-[#FF4D4D]" />
            DEMO PLAY
          </div>
          <button
            className="relative z-10 flex h-[84px] w-[84px] cursor-pointer items-center justify-center rounded-full bg-white/95 text-[#111111] shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition-transform duration-200 group-hover:scale-105"
            type="button"
            aria-label={`${project.title} 재생`}
            onClick={() => setHasStarted(true)}
          >
            <PlayIcon className="h-[30px] w-[30px] translate-x-0.5 fill-current" />
          </button>
        </>
      )}
      {playerError && (
        <p role="alert" className="absolute inset-x-0 bottom-0 z-20 bg-black/85 p-3 text-center text-sm text-white">
          영상을 불러오지 못했습니다. 페이지를 새로고침해 다시 시도해 주세요.
        </p>
      )}
    </div>
  )
}

function LocalVideoStage({ project }) {
  const playerRef = useRef(null)
  const videoRef = useRef(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [videoError, setVideoError] = useState(false)
  const hasVideo = Boolean(project.video) && !videoError

  const playVideo = async () => {
    const video = videoRef.current
    if (!video || !hasVideo) return
    setHasStarted(true)
    try {
      await video.play()
    } catch {
      setHasStarted(false)
      setIsPlaying(false)
    }
  }

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video || !hasVideo) return
    if (!hasStarted || video.paused) playVideo()
    else video.pause()
  }

  const handleEnded = () => {
    if (videoRef.current) videoRef.current.currentTime = 0
    setHasStarted(false)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const handleSeek = (event) => {
    const video = videoRef.current
    if (!video || !duration) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const ratio = Math.min(Math.max((event.clientX - bounds.left) / bounds.width, 0), 1)
    video.currentTime = ratio * duration
    setCurrentTime(video.currentTime)
  }

  const toggleFullscreen = async () => {
    if (!playerRef.current) return
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await playerRef.current.requestFullscreen()
    } catch {
      // The browser can reject fullscreen requests in restricted environments.
    }
  }

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return '00:00'
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div
      ref={playerRef}
      className={`group relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl shadow-[var(--watch-shadow)] fullscreen:h-screen fullscreen:w-screen fullscreen:rounded-none ${hasVideo ? 'bg-black' : 'bg-[linear-gradient(135deg,#565FC7_0%,#808DFD_45%,#C6CBFF_100%)]'}`}
    >
      {project.video && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full cursor-pointer object-contain ${hasStarted && !videoError ? 'block' : 'hidden'}`}
          src={project.video}
          preload="metadata"
          playsInline
          onClick={togglePlayback}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onEnded={handleEnded}
          onError={() => {
            setVideoError(true)
            setHasStarted(false)
            setIsPlaying(false)
          }}
        />
      )}

      {(!hasStarted || !hasVideo) && (
        <img
          className={`absolute inset-0 h-full w-full object-contain ${hasVideo ? 'cursor-pointer' : ''}`}
          src={project.img}
          alt={`${project.title} 프로젝트 미리보기`}
          onClick={hasVideo ? playVideo : undefined}
          onError={(event) => {
            event.currentTarget.hidden = true
          }}
        />
      )}
      {!hasStarted && <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.08)_0_2px,transparent_2px_26px)]" />}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-md bg-black/55 px-2.5 py-1.5 font-['Space_Mono',monospace] text-xs font-bold tracking-[0.5px] text-white">
        <span className="h-[7px] w-[7px] rounded-full bg-[#FF4D4D]" />
        DEMO PLAY
      </div>

      {hasVideo && !hasStarted && <button
        className="relative z-10 flex h-[84px] w-[84px] cursor-pointer items-center justify-center rounded-full bg-white/95 text-[#111111] shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition-transform duration-200 group-hover:scale-105"
        type="button"
        aria-label={`${project.title} 재생`}
        onClick={playVideo}
      >
        <PlayIcon className="h-[30px] w-[30px] translate-x-0.5 fill-current" />
      </button>}

      {hasVideo && hasStarted && <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-5 bg-[linear-gradient(to_top,rgba(0,0,0,0.72),transparent)] px-[18px] pb-3.5 pt-[26px] opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div
          className="relative mb-3 h-1 cursor-pointer rounded bg-white/35"
          role="slider"
          tabIndex={0}
          aria-label="영상 재생 위치"
          aria-valuemin={0}
          aria-valuemax={Math.floor(duration)}
          aria-valuenow={Math.floor(currentTime)}
          onClick={handleSeek}
          onKeyDown={(event) => {
            const video = videoRef.current
            if (!video || !duration || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return
            event.preventDefault()
            video.currentTime = Math.min(Math.max(video.currentTime + (event.key === 'ArrowRight' ? 5 : -5), 0), duration)
          }}
        >
          <div
            className="relative h-full rounded bg-[var(--watch-accent)] after:absolute after:right-[-5px] after:top-1/2 after:h-3 after:w-3 after:-translate-y-1/2 after:rounded-full after:bg-white after:content-['']"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button type="button" aria-label={isPlaying ? '일시정지' : '재생'} onClick={togglePlayback}>
              {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4 fill-current" />}
            </button>
            <span className="font-['Space_Mono',monospace] text-xs">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <button
            type="button"
            aria-label="전체 화면" 
            onClick={toggleFullscreen}
            className='cursor-pointer'
          >
            <FullscreenIcon className="h-4 w-4" />
          </button>
        </div>
      </div>}
    </div>
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

export { VideoStage }
