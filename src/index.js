import "./style.css";
import projectIcon from "./icons/addProject.png";
import todoIcon from "./icons/addTodo.png";
import { projectLoader } from "./modules/projects.js";
import { setPriority } from "./modules/setPriority.js";
import { defaultProject } from "./modules/defaultProject.js";
// Create Project
import { createProject } from "./modules/createProjects.js";
// Create Todo
import { createNewTodo } from "./modules/createTodos.js";
import {
  projectsContainer,
  todosContainer,
  showProjectsBtn,
  cancelBtn,
  dialogProject,
  dialogTodo,
  cancelTodoBtn,
  createBtn,
  addBtn,
  createTodoBtn,
} from "./modules/domModule.js";

import {
  markTodoAsCompleted,
  UnmarkTodoAsCompleted,
} from "./modules/markTodo.js";
export {
  markTodoAsCompleted,
  UnmarkTodoAsCompleted,
} from "./modules/markTodo.js";
export { todoIcon };

// implement project add icon
const myProjectIcon = new Image();
myProjectIcon.src = projectIcon;
myProjectIcon.classList.add("plus");

addBtn.id = "addBtn";
addBtn.textContent = `New Project`;
addBtn.insertBefore(myProjectIcon, addBtn.firstChild);

//Projects dialog
addBtn.addEventListener("click", () => {
  dialogProject.showModal();
});

cancelBtn.addEventListener("click", () => {
  dialogProject.close();
});

//Todo dialog
cancelTodoBtn.addEventListener("click", () => {
  dialogTodo.close();
});

showProjectsBtn.addEventListener("click", () => {
  projectsContainer.style.display = "block";
  todosContainer.style.display = "none";
});

createTodoBtn.addEventListener("click", () => {
  const projectContainers = document.querySelectorAll(".project-container");
  const projectInfos = document.querySelectorAll(".project-info span");

  // Create Todo
  projectContainers.forEach((container) => {
    if (container.style.display === "block") {
      const header = container.firstChild.textContent;
      createNewTodo(header);
    }
  });

  // Update project info
  for (let i = 0; i < projectInfos.length; i++) {
    projectInfos[i].textContent = projectLoader.projects[i].todos.length;
  }
});

defaultProject();

createBtn.addEventListener("click", createProject);
