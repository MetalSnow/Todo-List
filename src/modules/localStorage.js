import { renderProject, renderTodo } from "./domModule";
import { UnmarkTodoAsCompleted, markTodoAsCompleted } from "./markTodo";
import { projectLoader } from "./projects";
export {
  saveProjectIntoLocalStorage,
  updateProjectsInLocalStorage,
  getDataFromLocalStorage,
  saveDefaultProjectInLocalStorage,
  deleteProjectFromLocalStorage,
};

const saveDefaultProjectInLocalStorage = () => {
  localStorage.setItem(
    `Project ${0}`,
    JSON.stringify(projectLoader.projects[0])
  );
};

let projectNum = 1;

const saveProjectIntoLocalStorage = () => {
  const projectsLength = projectLoader.projects.length;
  const lastProject = projectLoader.projects[projectsLength - 1];

  localStorage.setItem(`Project ${projectNum++}`, JSON.stringify(lastProject));
};

const updateProjectsInLocalStorage = (projectIndex) => {
  const currentProject = projectLoader.projects[projectIndex];
  localStorage.setItem(
    `Project ${projectIndex}`,
    JSON.stringify(currentProject)
  );
};

const deleteProjectFromLocalStorage = () => {
  localStorage.clear();
  const projects = projectLoader.projects;
  for (let i = 0; i < projects.length; i++) {
    updateProjectsInLocalStorage(i);
  }
};

const getDataFromLocalStorage = () => {
  // Remove default project
  projectLoader.projects.shift();

  for (let i = 0; i < localStorage.length; i++) {
    let getProject = localStorage.getItem(`Project ${i}`);
    projectLoader.projects.push(JSON.parse(getProject));
  }

  projectLoader.projects.forEach((project) => {
    // Render Projects
    if (project.name !== "Home") {
      renderProject(project.name, project.color);
    }

    for (let i = 0; i < project.todos.length; i++) {
      // Render Todos
      if (project.todos.length !== 0) {
        renderTodo(
          project.todos[i].title,
          project.todos[i].description,
          project.todos[i].dueDate,
          project.todos[i],
          project.name
        );

        // Mark Todo as completed
        const labels = document.querySelectorAll("label");
        labels.forEach((label) => {
          if (label.textContent == project.todos[i].title) {
            const checkbox = label.parentElement.firstChild;
            if (project.todos[i].completed == true) {
              markTodoAsCompleted(label, project.todos[i]);
              checkbox.checked = true;
            } else {
              UnmarkTodoAsCompleted(label, project.todos[i]);
            }
          }
        });
      }
    }
  });
};
