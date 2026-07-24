function ProjectQueue({
  projects,
  activeProject,
  activeProjectTitle,
  onProjectSelect,
}) {
  return (
    <aside
      className="rounded-[8px] border border-[var(--portfolio-line)] bg-[var(--portfolio-panel)] p-4 shadow-[var(--portfolio-shadow)] transition-colors duration-300 max-[900px]:order-2"
      aria-label="Project playlist"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="m-0 text-xl">Up Next</h2>
        <button className="cursor-pointer border-0 bg-transparent text-[13px] font-extrabold text-[var(--portfolio-accent)]">
          View all
        </button>
      </div>

      {projects.map((project, index) => {
        const isActive = activeProject === index

        return (
          <button
            key={project.title}
            className={`grid w-full cursor-pointer grid-cols-[112px_minmax(0,1fr)] gap-3 rounded-[8px] border p-2.5 text-left text-[var(--portfolio-text)] max-[620px]:grid-cols-[96px_minmax(0,1fr)] ${
              isActive
                ? 'border-[var(--portfolio-line)] bg-[var(--portfolio-panel-hover)]'
                : 'border-transparent bg-transparent hover:border-[var(--portfolio-line)] hover:bg-[var(--portfolio-panel-hover)]'
            }`}
            type="button"
            aria-pressed={isActive}
            aria-label={`${project.title}, ${project.meta}`}
            onClick={() => onProjectSelect(index)}
          >
            <span
              className={`relative aspect-video overflow-hidden rounded-[8px] ${project.thumbClass} after:absolute after:bottom-[7px] after:right-[9px] after:grid after:h-[22px] after:w-7 after:place-items-center after:rounded-md after:bg-[rgba(18,22,45,0.72)] after:text-[11px] after:text-white after:content-['>']`}
              aria-hidden="true"
            />
            <span>
              <strong className="mt-1 block text-sm">{project.title}</strong>
              <small className="mt-[7px] block leading-[1.35] text-[var(--portfolio-muted)]">
                {project.meta}
              </small>
            </span>
          </button>
        )
      })}

      <p className="sr-only">Current project: {activeProjectTitle}</p>
    </aside>
  )
}

export default ProjectQueue
