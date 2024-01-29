import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const EditProject = () => {
  const [showProjectError, setShowProjectError] = useState(false);
  const { id } = useParams();

  const [title, setTitle] = useState('')

  const [pattern, setPattern] = useState('')
  const [description, setDescription] = useState('')
  const [imgURL, setPic] = useState('')
  const [completedStatus, setCompleted] = useState('')
  const navigate = useNavigate()

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
        setTitle(data.title)
        setPattern(data.pattern)
        setDescription(data.description)
        setPic(data.imgURL)
        setCompleted(data.completed)
        setShowProjectError(false);

        const storedCompletedStatus = localStorage.getItem(`completedStatus-${id}`);
        setCompleted(storedCompletedStatus !== null ? JSON.parse(storedCompletedStatus) : data.completed);

      })
      .catch((error) => {
        console.log('Fetch error:', error);
        setShowProjectError(true);
      })

  }, []);

  const handleEditProject = () => {
    const data = {
      title,
      imgURL,
      pattern,
      description,
      completed: completedStatus
    };
    fetch(`http://localhost:4000/projects/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('http error');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        navigate('/');
      })
      .catch((error) => {
        alert('error');
        console.log(error);
      })
  };

  const handleSelectChange = (e) => {
    const value = e.target.value === 'true';
    setCompleted(value);
  };

  return (
    <div className="add-project-container">
      <div className="add-project">
        <h2> Edit Project</h2>

        <form className="form-project-new">
          <input className="add-title" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea className="add-pattern" placeholder="Paste Pattern Here" rows='10' cols='50' value={pattern} onChange={e => setPattern(e.target.value)}></textarea>
          <textarea className="add-desc" placeholder="Input Description Here" rows='10' cols='50' value={description} onChange={e => setDescription(e.target.value)}></textarea>
          <input className="add-pic" type="text" placeholder="Upload Image URL" value={imgURL} onChange={e => setPic(e.target.value)} />
          <select className="project-status" value={completedStatus.toString()} onChange={handleSelectChange}>
            <option value="true">Completed</option>
            <option value="false">In Progress</option>
          </select>
          <button type="button" onClick={handleEditProject}> Save </button>
        </form>
      </div>
    </div>
  )
}

export default EditProject