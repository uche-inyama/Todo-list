const storage = (() => {
  let store;
  const storeKey = 'todos-database';

  const getStorage = () => {
    store = window.localStorage.getItem(storeKey);
    if (!store) {
      store = [];
      window.localStorage.setItem(storeKey, JSON.stringify(store));
    }

    return store;
  };

  const getProjects = () => JSON.parse(getStorage());

  /**
   * Insert a new project into the store
   * @param {Project} project
   */
  const addProject = project => {
    const projects = [project, ...getProjects()];
    window.localStorage.setItem(storeKey, JSON.stringify(projects));
  };

  function getProjectById(id) {
    for (const project of getProjects()) {
      if (project.id === id) {
        return project;
      }
    }
  }

  function getTodoItemById(projectId, index) {
    const project = getProjectById(projectId);
    const todoItem = project.todos[index];
    return todoItem;
  }

  const addTodoItem = (projectCategory, todoItem) => {
    store = getProjects();
    store.forEach(element => {
      if (element['name'] === projectCategory) {
        element.todos.push(todoItem);
        window.localStorage.setItem(storeKey, JSON.stringify(store));
      }
    });
  };

  const deleteProject = evt => {
    const store = getProjects();
    let name = getProjects().map(element => element.name);
    let index = name.findIndex(name => name === evt.target.dataset.target);
    store.splice(index, 1);
    window.localStorage.setItem(storeKey, JSON.stringify(store));
  };

  const deleteTodoItem = (projectId, index) => {
    const project = getProjectById(projectId);
    project.todos.splice(index, 1);
    updateProject(projectId, project);
  };

  const existsProject = name => {
    const projects = getProjects();
    for (const project of projects) {
      if (project.name.toLowerCase().trim() === name.toLowerCase().trim()) {
        return true;
      }
    }
    return false;
  };

  const updateProject = (id, project) => {
    const projects = getProjects();
    let i = -1;
    projects.forEach((p, index) => {
      if (id === p.id) {
        i = index;
      }
    });
    projects.splice(i, 1, project);
    window.localStorage.setItem(storeKey, JSON.stringify(projects));
  };

  const updateTodoItem = (projectId, index, todoItem) => {
    const project = getProjectById(projectId);
    project.todos.splice(index, 1, todoItem);
    updateProject(projectId, project);
  };

  const editProject = (projectId, projectName) => {
    const project = getProjectById(projectId);
    project.name = projectName;
    updateProject(projectId, project);
  };

  return {
    addProject,
    existsProject,
    getProjectById,
    getProjects,
    addTodoItem,
    deleteProject,
    deleteTodoItem,
    editProject,
    updateProject,
    updateTodoItem,
    getTodoItemById
  };
})();

export default storage;
