const Header2 = () => {
  return (
    <header className="relative z-10 flex h-12 w-full items-center gap-4 bg-white px-5 shadow-[0_10px_28px_rgb(126_108_255_/_0.2)]">
        <button
          type="button"
          className="relative h-6 w-11 shrink-0 rounded-full bg-[#E9ECFF] transition-colors"
          aria-label="Toggle menu"
        >
          <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-[#8C7BFF] shadow-sm" />
        </button>

        <div className="flex min-w-[96px] items-center">
          {/* Replace this box with your logo image. */}
          <div className="h-7 w-24 rounded-md bg-[#EEE9FF]" />
        </div>

        <form className="mx-auto flex h-9 w-full max-w-[470px] items-center overflow-hidden rounded-full border border-[#D9D4EE] bg-white">
          <input
            className="h-full min-w-0 flex-1 bg-transparent px-5 text-sm text-[#171717] outline-none placeholder:text-[#9B96AA]"
            type="search"
            placeholder="검색"
            aria-label="검색"
          />
          <button
            type="submit"
            className="flex h-full w-12 items-center justify-center border-l border-[#D9D4EE] text-[#171717]"
            aria-label="검색하기"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m21 21-4.3-4.3m1.3-5.2a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-2 text-sm font-semibold text-[#171717]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEE9FF] text-[#7C6DFF]">
            :)
          </span>
          <span>환영합니다 사용자님!</span>
        </div>
      </header>
  )
}

export default Header2
