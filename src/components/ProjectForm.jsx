import React, { useState } from 'react';
import Modal from './Modal';
import '../styles/ProjectForm.css';

const ProjectForm = ({ closeForm, addProject }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim()) {
      setError('Project name is required.');
      return;
    }
    
    if (!dueDate) {
      setError('Due date is required.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (dueDate < today) {
      setError('Due date cannot be in the past.');
      return;
    }

    const newProject = {
      id: Date.now(),
      name,
      status,
      dueDate,
    };

    addProject(newProject);
    closeForm();
  };

  return (
    <Modal closeModal={closeForm}>
      <div className="project-form-container">
        <h2>Add New Project</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }} 
              placeholder="Enter project name"
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input 
              type="date" 
              value={dueDate} 
              onChange={(e) => {
                setDueDate(e.target.value);
                if (error) setError('');
              }}
            />
          </div>
          <div className="form-actions">
            <button type="submit">Add Project</button>
            <button type="button" onClick={closeForm}>Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProjectForm;
