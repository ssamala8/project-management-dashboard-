import React, { useState } from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import './styles.css';

const ProjectRow = ({ project, onUpdate }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [projectName, setProjectName] = useState(project.name);
  const [dueDate, setDueDate] = useState(project.dueDate);

  const handleNameClick = () => {
    setIsEditingName(true);
  };

  const handleNameBlur = () => {
    setIsEditingName(false);
    onUpdate({ ...project, name: projectName });
  };

  const handleDateChange = (date) => {
    setDueDate(date);
    onUpdate({ ...project, dueDate: date });
  };

  return (
    <div className="project-row">
      <div
        className={`project-name ${isEditingName ? 'editing' : ''}`}
        contentEditable={isEditingName}
        onClick={handleNameClick}
        onBlur={handleNameBlur}
        suppressContentEditableWarning={true}
        onInput={(e) => setProjectName(e.currentTarget.textContent)}
      >
        {projectName}
      </div>
      <ModernDatepicker
        date={dueDate}
        format={'DD-MM-YYYY'}
        showBorder
        className="date-picker"
        onChange={handleDateChange}
        placeholder={'Select a due date'}
      />
    </div>
  );
};

export default ProjectRow;
