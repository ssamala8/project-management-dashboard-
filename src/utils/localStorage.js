export const getProjectsFromLocalStorage = () => {
    const data = localStorage.getItem('projects');
    return data ? JSON.parse(data) : [];
  };
  
  export const saveProjectsToLocalStorage = (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
  };
  