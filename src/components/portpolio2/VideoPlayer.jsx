function VideoPlayer({
  chapters,
  activeChapter,
  progress,
  reelTitle,
  onChapterSelect,
}) {
  return (
    <article className="overflow-hidden rounded-[8px] border border-[var(--portfolio-line)] bg-[var(--portfolio-panel)] shadow-[var(--portfolio-shadow)] transition-colors duration-300">
      <div className="bg-transparent p-0">
        <div className="group relative grid aspect-video place-items-center overflow-hidden rounded-t-[8px] bg-[image:var(--portfolio-screen)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[length:76px_76px] [mask-image:linear-gradient(black,transparent_78%)]" />
          <div
            className="relative grid h-[94px] w-[94px] scale-[0.92] place-items-center rounded-full bg-[rgba(255,255,255,0.94)] pl-[7px] text-[38px] text-[var(--portfolio-accent-strong)] opacity-0 shadow-[0_22px_60px_rgba(0,0,0,0.28)] transition duration-200 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100"
            aria-hidden="true"
          >
            &#9658;
          </div>
          <PlayerControls progress={progress} />
        </div>
      </div>

      <div className="flex justify-between gap-6 p-6 max-[620px]:grid max-[620px]:p-[18px]">
        <div>
          <p className="mb-2.5 text-[13px] font-extrabold uppercase text-[var(--portfolio-accent)]">
            생성형 API Web App
          </p>
          <h2 className="mb-0 text-[clamp(24px,3vw,36px)] leading-[1.22] tracking-normal">
            {reelTitle}
          </h2>
        </div>
        <button className="h-fit shrink-0 cursor-pointer rounded-[8px] border-0 bg-[var(--portfolio-accent-strong)] px-[18px] py-[13px] font-extrabold text-white shadow-[0_14px_30px_rgba(128,141,253,0.34)]">
          
        </button>
      </div>

      <div
        className="grid grid-cols-4 gap-2.5 px-6 pb-6 max-[620px]:grid-cols-1 max-[620px]:px-[18px] max-[620px]:pb-[18px]"
        aria-label="Video chapters"
      >
        {chapters.map((chapter, index) => {
          const isActive = activeChapter === index

          return (
            <button
              key={chapter.time}
              className={`min-h-[66px] cursor-pointer rounded-[8px] border p-3 text-left font-extrabold ${
                isActive
                  ? 'border-[var(--portfolio-accent-strong)] bg-[var(--portfolio-accent-strong)] text-white'
                  : 'border-[var(--portfolio-line)] bg-[var(--portfolio-panel-soft)] text-[var(--portfolio-text)] hover:bg-[var(--portfolio-panel-hover)]'
              }`}
              type="button"
              onClick={() => onChapterSelect(index)}
            >
              <span
                className={`mb-[5px] block text-xs ${
                  isActive ? 'text-[rgba(255,255,255,0.76)]' : 'text-[var(--portfolio-accent)]'
                }`}
              >
                {chapter.time}
              </span>
              {chapter.label}
            </button>
          )
        })}
      </div>
    </article>
  )
}

function PlayerControls({ progress }) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 grid translate-y-2.5 grid-cols-[36px_42px_36px_minmax(80px,1fr)_auto_36px] items-center gap-2.5 bg-[linear-gradient(to_top,rgba(10,13,31,0.88),rgba(10,13,31,0.18))] p-3.5 text-white opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 max-[620px]:grid-cols-[34px_38px_34px_1fr]"
      aria-label="Video controls"
    >
      <ControlButton label="Previous chapter">&#9198;</ControlButton>
      <ControlButton label="Play" isPrimary>
        &#9658;
      </ControlButton>
      <ControlButton label="Next chapter">&#9197;</ControlButton>
      <div className="h-[7px] overflow-hidden rounded-full bg-[rgba(255,255,255,0.22)]">
        <span
          className="block h-full rounded-[inherit] bg-[var(--portfolio-accent-strong)] transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
      <time className="text-xs font-bold text-[rgba(255,255,255,0.72)] max-[620px]:hidden">
        02:18 / 04:40
      </time>
      <ControlButton label="Fullscreen" className="max-[620px]:hidden">
        []
      </ControlButton>
    </div>
  )
}

function ControlButton({ children, className = '', isPrimary = false, label }) {
  return (
    <button
      className={`grid h-9 cursor-pointer place-items-center rounded-[8px] border-0 ${
        isPrimary
          ? 'w-[42px] bg-white text-[#101326]'
          : 'w-9 bg-[rgba(255,255,255,0.12)] text-white'
      } ${className}`}
      type="button"
      aria-label={label}
    >
      {children}
    </button>
  )
}

export default VideoPlayer
