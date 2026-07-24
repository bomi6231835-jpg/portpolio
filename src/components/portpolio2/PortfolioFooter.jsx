function PortfolioFooter() {
  return (
    <footer
      id="contact"
      className="flex w-full items-center justify-between gap-4 border-t border-[var(--portfolio-line)] px-[clamp(18px,4vw,56px)] py-6 text-sm font-bold text-[var(--portfolio-muted)] max-[620px]:flex-col max-[620px]:items-start max-[620px]:px-3"
    >
      <span>Framefolio</span>
      <a className="text-[var(--portfolio-accent)] hover:text-[var(--portfolio-text)]" href="mailto:hello@framefolio.dev">
        hello@framefolio.dev
      </a>
    </footer>
  )
}

export default PortfolioFooter
