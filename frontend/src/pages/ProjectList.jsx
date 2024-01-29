import { Project } from "./Project"

export function ProjectList({ projects, toggleFinished }) {
  return (
    <ul className="project-list">
      {projects.map(project => {
        return (
          <Project {...project}
            key={project._id}
            toggleFinished={toggleFinished}
          />)
      })}

    </ul>
  )


}