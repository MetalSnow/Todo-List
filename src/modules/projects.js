export { projectLoader };

function project(projects) {
  projects = [];
  const createProject = (name, color) => {
    const newProject = {
      name: name,
      color: color,
      todos: [],
      addNewTodo(todo) {
        this.todos.push(todo);
      },
    };
    projects.push(newProject);
  };

  return {
    projects,
    createProject,
  };
}

const projectLoader = project();
