import { useEffect } from 'react'

function ModalIcon({ icon, isOpen, onClose }) {
    useEffect(() => {
        if (!isOpen) return undefined

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose()
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    if (!isOpen || !icon) return null

    return (
        <>
            <button
                type="button"
                className="absolute inset-0 z-30 cursor-default bg-black/20"
                aria-label="모달 닫기"
                onClick={onClose}
            />

            <div
                className="absolute left-1/2 top-1/2 z-40 flex
                h-[min(500px,calc(100vh-2rem))] w-[min(400px,calc(100vw-2rem))]
                -translate-x-1/2 -translate-y-1/2 flex-col items-center overflow-hidden
                rounded-3xl border border-[var(--color-primary)]/20
                bg-[var(--color-primary-light)] shadow-[0_28px_80px_rgb(17_17_17_/_0.2)]"
                role="dialog"
                aria-modal="true"
                aria-label={`${icon.alt} 상세 정보`}
            >
                <div className="relative flex h-[45px] w-full shrink-0 items-center justify-center border-b border-[var(--color-primary)]/10 bg-white">
                    <img
                        src="/img/phoneStatus.png"
                        alt=""
                        aria-hidden="true"
                        className="h-auto w-[70%] object-contain"
                    />
                    <button
                        type="button"
                        className="absolute right-3 grid h-7 w-7 place-items-center rounded-full bg-black/5 text-lg leading-none text-[var(--color-text)]/60 transition-colors hover:bg-black/10 hover:text-[var(--color-text)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-primary)]"
                        aria-label="모달 닫기"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div className="flex min-h-0 w-full flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-4">
                    <section className="group w-full shrink-0 overflow-hidden rounded-3xl border border-[var(--color-primary)]/15 bg-white p-3 text-center shadow-[0_12px_32px_rgb(103_113_224_/_0.14)]">
                        <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#565FC7_0%,#808DFD_45%,#C6CBFF_100%)] shadow-[0_10px_24px_rgb(86_95_199_/_0.24)]">
                            <div
                                className="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.08)_0_2px,transparent_2px_26px)]"
                                aria-hidden="true"
                            />
                            <img
                                src={icon.src}
                                alt=""
                                className="relative h-[140px] w-[140px] object-contain drop-shadow-[0_10px_16px_rgba(17,17,17,0.22)]"
                            />
                            <span
                                className="absolute grid h-11 w-11 place-items-center rounded-full
                                border border-white/40 bg-white/20 text-white
                                shadow-[0_10px_24px_rgba(0,0,0,0.18)] backdrop-blur-sm
                                transition-opacity duration-200 group-hover:opacity-0"
                                aria-hidden="true"
                            >
                                <svg
                                    className="h-5 w-5 translate-x-0.5 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </span>

                            <div
                                className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-[linear-gradient(to_top,rgba(0,0,0,0.72),transparent)] px-4 pb-4 pt-10 text-left opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                                aria-hidden="true"
                            >
                                <div className="mb-2 flex justify-between items-center gap-2 text-sm font-bold text-white">

                                    <span>나의 역량 수준</span>
                                    <span className="font-['Space_Mono',monospace]">
                                        {icon.level}%
                                    </span>

                                </div>
                                <div className="h-1.5 w-full rounded-full bg-white/35">
                                    <div
                                        className="relative h-full rounded-full bg-white after:absolute after:right-[-5px] after:top-1/2 after:h-3 after:w-3 after:-translate-y-1/2 after:rounded-full after:bg-white after:shadow-[0_1px_4px_rgba(0,0,0,0.35)] after:content-['']"
                                        style={{ width: `${icon.level}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                <div className="px-3 pb-2 pt-4">
                    <h2 className="text-lg font-black text-[var(--color-text)]">
                        {icon.alt}
                    </h2>
                    <p className="mt-1.5 break-keep text-sm leading-6 text-[var(--color-text)]/65">
                        {icon.summary}
                    </p>
                </div>
            </section>

            <section className="w-full shrink-0 rounded-3xl border border-[var(--color-primary)]/15 bg-white px-6 py-5 shadow-[0_12px_32px_rgb(103_113_224_/_0.14)]">
                <p className="mb-2 text-sm font-black text-[var(--color-primary)]">
                    상세 설명
                </p>
                <p className="whitespace-pre-wrap break-words text-sm leading-6 text-[var(--color-text)]/75">
                    {icon.description}
                </p>
            </section>
        </div >
            </div >
        </>
    )
}

export default ModalIcon
