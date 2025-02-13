import React, { useState } from 'react';
import Modal from './Modal';
import '../styles/ProjectItem.css';

const ProjectItem = ({ project, updateProject, deleteProject }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(project.name);
  const [tempStatus, setTempStatus] = useState(project.status);
  const [tempDueDate, setTempDueDate] = useState(project.dueDate);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dateError, setDateError] = useState('');

  const handleSave = () => {
    if (!tempName.trim()) {
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (tempDueDate < today) {
      setDateError('Due date cannot be in the past.');
      return;
    }

    updateProject({ ...project, name: tempName, status: tempStatus, dueDate: tempDueDate });
    setIsEditing(false);
    setDateError('');
  };

  const handleCancel = () => {
    setTempName(project.name);
    setTempStatus(project.status);
    setTempDueDate(project.dueDate);
    setIsEditing(false);
    setDateError('');
  };

  const handleDueDateChange = (e) => {
    setTempDueDate(e.target.value);
    setDateError(''); // Clear error on new selection
  };

  const confirmDelete = () => {
    deleteProject(project.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <tr>
        <td>
          {isEditing ? (
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              autoFocus
            />
          ) : (
            project.name
          )}
        </td>
        <td>
          {isEditing ? (
            <select value={tempStatus} onChange={(e) => setTempStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          ) : (
            project.status
          )}
        </td>
        <td>
          {isEditing ? (
            <>
              <input
                type="date"
                value={tempDueDate}
                onChange={handleDueDateChange}
              />
              {dateError && <div className="error-text">{dateError}</div>}
            </>
          ) : (
            new Date(project.dueDate).toLocaleDateString()
          )}
        </td>
        <td>
          {isEditing ? (
            <>
              <div className="button-group">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div className="button-group">
              <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
              <button className="delete-btn" onClick={() => setShowDeleteModal(true)}>Delete</button>
              </div>
            </>
          )}
        </td>
      </tr>

      {showDeleteModal && (
        <Modal closeModal={() => setShowDeleteModal(false)}>
          <div className="delete-confirmation">
            <p>Are you sure you want to delete this project?</p>
            <div className="modal-actions">
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={() => setShowDeleteModal(false)}>No</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProjectItem;
