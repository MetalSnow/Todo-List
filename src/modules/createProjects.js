export { createProject };
import { showTodoSection } from "./showTodos";
import { projectLoader } from "./projects.js";
import { todoIcon } from "../index.js";
import { deletProject } from "./deleteProject.js";
import {
  todosContainer,
  projectsContainer,
  projectsDiv,
  projectsCounter,
  dialogProject,
  dialogTodo,
} from "./domModule";

const createProject = () => {
  let inputName = document.querySelector("#name");
  let inputColor = document.querySelector("#color");

  // Check if inputName is filled
  if (inputName.value === "") {
    alert("Please Enter Project's Name!");
    return;
  }

  // Create project button and info
  const projectsBtn = document.createElement("button");
  const todoAddBtn = document.createElement("button");
  const projectInfo = document.createElement("div");
  const todoCounter = document.createElement("span");
  const deleteBtn = document.createElement("button");

  projectInfo.textContent = `# ${inputName.value} / todos: `;
  todoCounter.textContent = "0";
  projectsBtn.textContent = `# ${inputName.value}`;
  projectsBtn.style.backgroundColor = `light${inputColor.value}`;
  projectInfo.style.backgroundColor = `light${inputColor.value}`;
  projectInfo.classList.add("project-info");
  projectInfo.setAttribute("id", "");
  deleteBtn.textContent = "Remove Project";

  projectInfo.append(todoCounter, deleteBtn);
  projectsContainer.appendChild(projectInfo);
  projectsDiv.appendChild(projectsBtn);

  // Create project and project container
  projectLoader.createProject(inputName.value, inputColor.value);

  const todosProject = document.createElement("div");
  const h3 = document.createElement("h3");
  h3.textContent = inputName.value;
  todosProject.classList.add("project-container");
  todosProject.style.display = "block";

  // Implement todo add icon
  const myTodoIcon = new Image();
  myTodoIcon.src = todoIcon;
  myTodoIcon.classList.add("plus");

  todoAddBtn.classList.add("todo-add-btn");
  todoAddBtn.textContent = `Add Task`;
  todoAddBtn.insertBefore(myTodoIcon, todoAddBtn.firstChild);
  todoAddBtn.addEventListener("click", () => {
    dialogTodo.showModal();
  });

  todosProject.append(h3, todoAddBtn);

  //Remove Project EventListener
  const projectName = h3.textContent.split().splice(0, 1).join();
  deleteBtn.addEventListener("click", () => {
    deletProject(projectInfo, projectsBtn, todosProject, projectName);
  });

  // Clear input fields and close dialog
  inputName.value = "";
  projectsCounter.textContent = projectLoader.projects.length;

  projectsBtn.addEventListener("click", showTodoSection);
  dialogProject.close();

  // Hide todos of the previously active project container
  const existingProjectContainers =
    document.querySelectorAll(".project-container");

  existingProjectContainers.forEach((container) => {
    container.style.display = "none";
  });

  // Append new project container to todos container
  todosContainer.appendChild(todosProject);

  console.log(projectLoader.projects);
};
