import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const AddProject = () => {
  const [title, setTitle] = useState('')
  const [pattern, setPattern] = useState('')
  const [description, setDescription] = useState('')
  const [imgURL, setPic] = useState('')
  const navigate = useNavigate()

  const handleAddProject = () => {
    const data = {
      title,
      imgURL,
      pattern,
      description,
      completed: false
    };
    fetch('http://localhost:4000/projects', {
      method: 'POST',
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

  return (
    <div className="add-project-container">
      <div className="add-project">
        <h2> Add Project</h2>

        <form className="form-project-new">
          <input className="add-title" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea className="add-pattern" placeholder="Paste Pattern Here" rows='10' cols='50' value={pattern} onChange={e => setPattern(e.target.value)}></textarea>
          <textarea className="add-desc" placeholder="Input Description Here" rows='10' cols='50' value={description} onChange={e => setDescription(e.target.value)}></textarea>
          <input className="add-pic" type="text" placeholder="Upload Image URL" value={imgURL} onChange={e => setPic(e.target.value)} />
          <button type="button" onClick={handleAddProject}> Add </button>
        </form>
      </div>
    </div>
  )
}

export default AddProject