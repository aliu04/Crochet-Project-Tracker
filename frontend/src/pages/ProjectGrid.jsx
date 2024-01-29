import { Project } from "./Project"

export function ProjectGrid({ projects }) {
  return (
    <div className="project-grid">
      {projects.map(project => {
        return (
          <Project {...project}
            key={project._id}
          />)
      })}

    </div>
  )


}