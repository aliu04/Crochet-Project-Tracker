import { useState } from "react"
import { Link } from "react-router-dom"

export function NewProjectForm() {
  // const [newProjTitle, createNewProj] = useState("")

  // function handleSubmit(e) {
  //   e.preventDefault()

  //   onSubmit(newProjTitle)
  //   createNewProj("")
  // }

  return (
    <Link to="/projects/add">
      <button className="butt">Add Project</button>
    </Link>
  )
}