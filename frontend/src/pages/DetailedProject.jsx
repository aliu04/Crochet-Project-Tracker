import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const DetailedProject = () => {
  const [project, setProject] = useState('')
  const [showProjectError, setShowProjectError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();



  useEffect(() => {
    setShowProjectError(true);
    fetch(`http://localhost:4000/projects/details/${id}`)
      .then((response) => {

        if (!response.ok) {
          throw new Error('http error');
        }
        return response.json();
      })
      .then((data) => {
        setProject(data);
        setShowProjectError(false);
      })
      .catch((error) => {
        console.log('Fetch error:', error);
        setShowProjectError(true);
      })

  }, []);

  const handleDeleteProject = () => {
    fetch(`http://localhost:4000/projects/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Delete request failed');
        }
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <div className="detailed-project-container">
      <div className="detailed-project">
        <h1>Project Details</h1>
        <h2 className="title-detail">{project.title}</h2>
        <div className="pattern-detail">
          <h3>Pattern</h3>
          <p>{project.pattern}</p>
        </div>
        <div className="description-detail">
          <h3>Description</h3>
          <p>{project.description}</p>
        </div>
        <img className='image-detail' src={project.imgURL} alt={project.title} />
        <div className="project-status"> {project.completed ? "Completed" : "In Progress"} </div>
        <div className="detail-buttons">
          <Link to="/">
            <button>back</button>
          </Link>
          <Link to={`/projects/edit/${id}`}>
            <button>edit</button>
          </Link>
          <button onClick={handleDeleteProject}>delete</button>
        </div>
      </div>

    </div>
  )
}

export default DetailedProject