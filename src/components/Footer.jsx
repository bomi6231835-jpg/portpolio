const Footer = () => {
  return (
    <footer
      id="contact"
      className="w-full bg-[var(--color-primary-light)] text-[#2D2747]"
    >
      <div className="mx-auto flex w-full max-w-[1920px] items-end justify-between gap-10 px-8 py-8 max-[620px]:flex-col max-[620px]:items-start max-[620px]:gap-7 max-[620px]:px-4">
        <div className="space-y-2 text-sm leading-relaxed">
          <p className="text-xl font-black">
            로고
          </p>
          <p className="mt-1 text-sm font-bold tracking-[0.08em]">
            조예연's Portpolio site
          </p>
        </div>

        <div className="shrink-0 text-right max-[620px]:text-left">
          <p>
            <span className="font-bold">Naver:</span>{' '}
            <a
              className="transition-colors hover:text-[var(--color-primary)] hover:underline"
              href="mailto:bomi1835@naver.com"
            >
              bomi1835@naver.com
            </a>
          </p>
          <p>
            <span className="font-bold">Google:</span>{' '}
            <a
              className="transition-colors hover:text-[var(--color-primary)] hover:underline"
              href="mailto:bomi6231835@gmail.com"
            >
              bomi6231835@gmail.com
            </a>
          </p>
          <p>
            <span className="font-bold">깃허브:</span>{' '}
            <a
              className="break-all transition-colors hover:text-[var(--color-primary)] hover:underline"
              href="https://github.com/bomi6231835-jpg?tab=repositories"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/bomi6231835-jpg?tab=repositories
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
