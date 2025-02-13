import React, { useState, useEffect } from 'react';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import Pagination from './components/Pagination';
import { getProjectsFromLocalStorage, saveProjectsToLocalStorage } from './utils/localStorage';
import './styles/App.css';

const PROJECTS_PER_PAGE = 5;

const App = () => {
  const [projects, setProjects] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedProjects = getProjectsFromLocalStorage();
    if (storedProjects) {
      setProjects(storedProjects);
    }
  }, []);

  useEffect(() => {
    saveProjectsToLocalStorage(projects);
  }, [projects]);

  const addProject = (project) => {
    setProjects([...projects, project]);
  };

  const updateProject = (updatedProject) => {
    const updatedProjects = projects.map(proj => 
      proj.id === updatedProject.id ? updatedProject : proj
    );
    setProjects(updatedProjects);
  };

  const deleteProject = (id) => {
    const updatedProjects = projects.filter(proj => proj.id !== id);
    setProjects(updatedProjects);
  };

  // Filter projects by search term
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProject = currentPage * PROJECTS_PER_PAGE;
  const indexOfFirstProject = indexOfLastProject - PROJECTS_PER_PAGE;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Project Management Dashboard</h1>
        <div className="top-controls">
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchTerm} 
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }} 
          />
          <button onClick={() => setIsFormOpen(true)}>Add Project</button>
        </div>
      </header>
      <ProjectList 
        projects={currentProjects} 
        updateProject={updateProject} 
        deleteProject={deleteProject} 
      />
      <Pagination 
        totalPages={totalPages} 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
      />
      {isFormOpen && 
        <ProjectForm 
          closeForm={() => setIsFormOpen(false)} 
          addProject={addProject} 
        />
      }
    </div>
  );
};

export default App;
