const skills = [
  'Concept Planning',
  'Shooting Direction',
  'Editing Rhythm',
  'Motion Graphics',
]

function PortfolioDetails() {
  return (
    <section
      id="about"
      className="mt-[18px] grid grid-cols-[minmax(0,0.78fr)_minmax(300px,1fr)] gap-7 rounded-[8px] border border-[var(--portfolio-line)] bg-[var(--portfolio-panel)] p-[30px] shadow-[var(--portfolio-shadow)] transition-colors duration-300 max-[900px]:grid-cols-1 max-[620px]:p-[22px]"
    >
      <div>
        <p className="mb-2.5 text-[13px] font-extrabold uppercase text-[var(--portfolio-accent)]">
          Selected Skills
        </p>
        <h2 className="mb-0 text-[clamp(24px,3vw,36px)] leading-[1.22] tracking-normal">
          Designed so video production strengths are visible at a glance.
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-2.5 max-[620px]:grid-cols-1">
        {skills.map((skill, index) => (
          <article
            key={skill}
            className="rounded-[8px] border border-[var(--portfolio-line)] bg-[var(--portfolio-panel-soft)] p-4 transition-colors duration-300"
          >
            <strong className="block text-[13px] text-[var(--portfolio-accent)]">
              {String(index + 1).padStart(2, '0')}
            </strong>
            <span className="mt-[18px] block font-extrabold">{skill}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PortfolioDetails
