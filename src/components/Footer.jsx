import { useEffect, useState } from 'react'

const emailContacts = {
  naver: { label: 'Naver Mail', address: 'bomi1835@naver.com' },
}

const contactButtonClass =
  'rounded-full border border-current/20 bg-white/10 px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white active:border-[var(--color-primary)] active:bg-[var(--color-primary)] active:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]'

const Footer = ({ themeMode }) => {
  const [activePopup, setActivePopup] = useState(null)

  useEffect(() => {
    if (!activePopup) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActivePopup(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePopup])

  const popupClassName = `absolute bottom-[calc(100%+0.75rem)] left-1/2 z-[200] w-64 -translate-x-1/2 rounded-2xl border p-4 text-left shadow-[0_16px_40px_rgba(0,0,0,0.24)] max-[620px]:left-0 max-[620px]:translate-x-0 ${
    themeMode === 'dark'
      ? 'border-white/15 bg-[#25213D] text-white'
      : 'border-black/10 bg-white text-[#2D2747]'
  }`

  const closeButtonClass =
    'grid h-6 w-6 place-items-center rounded-full bg-black/10 text-base leading-none transition hover:bg-[var(--color-primary)] hover:text-white'

  return (
    <footer
      id="contact"
      className={`w-full transition-colors duration-300 ${
        themeMode === 'dark'
          ? 'bg-[#25213D] text-[var(--color-primary-light)]'
          : 'bg-[var(--color-primary-light)] text-[#2D2747]'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1920px] items-end justify-between gap-10 px-8 py-8 max-[620px]:flex-col max-[620px]:items-start max-[620px]:gap-7 max-[620px]:px-4">
        <div className="flex flex-col items-start gap-2 text-sm leading-relaxed">
          <img
            className="h-auto w-35 object-contain"
            src={themeMode === 'dark' ? '/img/logo_light.png' : '/img/logo_dark.png'}
            alt="VIDU"
          />
          {/* <p className="mt-4 text-sm font-bold tracking-[0.08em]">
            JOYEYEON&apos;s Portfolio site
          </p> */}
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2.5 max-[620px]:justify-start">
          {Object.entries(emailContacts).map(([key, contact]) => (
            <div className="relative" key={key}>
              <button
                type="button"
                className={`${contactButtonClass} ${
                  activePopup === key
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                    : ''
                }`}
                aria-expanded={activePopup === key}
                onClick={() =>
                  setActivePopup((current) => (current === key ? null : key))
                }
              >
                {contact.label}
              </button>

              {activePopup === key && (
                <section
                  className={popupClassName}
                  role="dialog"
                  aria-label={`${contact.label} 연락처`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black">{contact.label}</p>
                    <button
                      type="button"
                      className={closeButtonClass}
                      aria-label={`${contact.label} 팝업 닫기`}
                      onClick={() => setActivePopup(null)}
                    >
                      ×
                    </button>
                  </div>
                  <p className="mt-3 break-all text-xs font-bold opacity-75">
                    {contact.address}
                  </p>
                  <a
                    className="mt-3 flex w-full justify-center rounded-full bg-[var(--color-primary)] px-4 py-2 text-xs font-black text-white transition hover:brightness-110"
                    href={`mailto:${contact.address}`}
                  >
                    메일 보내기
                  </a>
                </section>
              )}
            </div>
          ))}

          <div className="relative">
            <button
              type="button"
              className={`${contactButtonClass} ${
                activePopup === 'qr'
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                  : ''
              }`}
              aria-expanded={activePopup === 'qr'}
              onClick={() =>
                setActivePopup((current) => (current === 'qr' ? null : 'qr'))
              }
            >
              QR 코드
            </button>

            {activePopup === 'qr' && (
              <section
                className={popupClassName}
                role="dialog"
                aria-label="모바일 포트폴리오 QR 코드"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black">QR 코드</p>
                  <button
                    type="button"
                    className={closeButtonClass}
                    aria-label="QR 코드 팝업 닫기"
                    onClick={() => setActivePopup(null)}
                  >
                    ×
                  </button>
                </div>
                <img
                  src="/img/portfolio-qr.png"
                  alt="모바일 포트폴리오 QR 코드"
                  className="mx-auto mt-3 h-32 w-32"
                />
                <p className="mt-3 text-center text-sm opacity-75">
                  QR 코드를 스캔하여 모바일에서도 확인해보세요.
                </p>
              </section>
            )}
          </div>

          <a
            className={contactButtonClass}
            href="https://github.com/bomi6231835-jpg?tab=repositories"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
