import React from 'react';
import ProjectItem from './ProjectItem';
import '../styles/ProjectList.css';

const ProjectList = ({ projects, updateProject, deleteProject }) => {
  return (
    <div className="project-list-container">
      <table className="project-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map(project => (
              <ProjectItem 
                key={project.id} 
                project={project} 
                updateProject={updateProject} 
                deleteProject={deleteProject} 
              />
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-projects">No projects found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
