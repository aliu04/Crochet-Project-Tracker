import { useEffect, useState } from "react"
import { NewProjectForm } from "./NewProjectForm"
import { ProjectGrid } from "./ProjectGrid"
import React from 'react'

import { Routes, Route } from 'react-router-dom'

const Home = () => {
  const [projects, setProjects] = useState([])
  const [showProjectsError, setShowProjectsError] = useState(false);

  useEffect(() => {
    setShowProjectsError(true);
    fetch('http://localhost:4000/projects')
      .then((response) => {
        if (!response.ok) {
          throw new Error('http error');
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data.data);
        console.log(data.data);
        setShowProjectsError(false);
      })
      .catch((error) => {
        console.log('Fetch error:', error);
        setShowProjectsError(true);
      })

  }, []);


  return (
    <div className="container">
      <h1 className="header">Projects</h1>
      <NewProjectForm />
      <ProjectGrid projects={projects} />
    </div>

  )
}

export default Home