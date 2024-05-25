export {
  renderProject,
  projectsContainer,
  todosContainer,
  renderDefaultProject,
  renderTodo,
};
import { todoIcon, projectIcon, todoCheckIcon } from "../index.js";
import { deletProject } from "./deleteProject.js";
import { showTodoSection } from "./showTodos";
import { projectLoader } from "./projects.js";
import { formatDistanceToNow } from "date-fns";
import { markTodoAsCompleted, UnmarkTodoAsCompleted } from "../index.js";
import { deleteTodo } from "./deleteTodo.js";
import { generateEditTodoDialog } from "./generateEditTodoDialog.js";
import { createNewTodo } from "./createTodos.js";
import { createProject } from "./createProjects.js";
import { updateProjectsInLocalStorage } from "./localStorage.js";

// Add icon to header
const todoListHeader = document.querySelector("h1");
const myCheckIcon = new Image();

myCheckIcon.src = todoCheckIcon;
myCheckIcon.classList.add("check-icon");

todoListHeader.parentNode.insertBefore(myCheckIcon, todoListHeader);

// project
const projectsContainer = document.querySelector(".project-list");
const todosContainer = document.querySelector(".todo-list");
const projectsDiv = document.querySelector(".projects");
const createBtn = document.querySelector("#create-pro");
const showProjectsBtn = document.querySelector("#myProjects");
const projectsCounter = document.querySelector(".proNum");
const addBtn = document.createElement("button");
const cancelBtn = document.querySelector("#cancel");
const dialogProject = document.querySelector(".project-dialog");

// Project inputs
const inputName = document.querySelector("#name");
const inputColor = document.querySelector("#color");

// todo inputs
const inputTitle = document.querySelector("#title");
const inputDescription = document.querySelector("#description");
const inputDate = document.querySelector("#date");
const inputPriority = document.querySelector("#priority");

createBtn.addEventListener("click", () => {
  createProject(inputName, inputColor);
});

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

//show projects section
showProjectsBtn.addEventListener("click", () => {
  projectsContainer.style.display = "flex";
  todosContainer.style.display = "none";
});

const renderProject = (inputName, inputColor) => {
  // Create project button and info
  const projectsBtn = document.createElement("button");
  const todoAddBtn = document.createElement("button");
  const projectInfo = document.createElement("div");
  const infoDiv = document.createElement("div");
  const infoPara = document.createElement("p");
  const todoCounter = document.createElement("span");
  const deleteBtn = document.createElement("button");

  infoPara.textContent = `# ${inputName.value || inputName} / todos: `;
  todoCounter.textContent = "0";
  projectsBtn.textContent = `# ${inputName.value || inputName}`;
  projectsBtn.classList.add("projects-btns");
  projectsBtn.style.backgroundColor = `light${inputColor.value || inputColor}`;
  projectInfo.style.backgroundColor = `light${inputColor.value || inputColor}`;
  projectInfo.classList.add("project-info");
  projectInfo.setAttribute("id", "");
  deleteBtn.textContent = "Remove Project";

  infoDiv.append(infoPara, todoCounter);
  projectInfo.append(infoDiv, deleteBtn);
  projectsContainer.appendChild(projectInfo);
  projectsDiv.appendChild(projectsBtn);

  const todosProject = document.createElement("div");
  const h3 = document.createElement("h3");
  h3.textContent = inputName.value || inputName;
  todosProject.classList.add("project-container");
  todosProject.style.backgroundColor = `light${inputColor.value || inputColor}`;
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
    projectsCounter.textContent = projectLoader.projects.length;
  });

  // Update Project Counter
  projectsCounter.textContent = projectLoader.projects.length;

  projectsBtn.addEventListener("click", showTodoSection);

  // Clear input fields and close dialog
  if (typeof inputName !== "string") {
    inputName.value = "";
    dialogProject.close();
  }

  // Hide todos of the previously active project container
  const existingProjectContainers =
    document.querySelectorAll(".project-container");

  existingProjectContainers.forEach((container) => {
    container.style.display = "none";
  });

  // Append new project container to todos container
  todosContainer.appendChild(todosProject);
};

const renderDefaultProject = () => {
  const homeBtn = document.createElement("button");
  const homeInfo = document.createElement("div");
  const homeInfoPara = document.createElement("p");
  const todoCounter = document.createElement("span");

  homeInfo.classList.add("project-info");
  homeInfo.style.backgroundColor = "#d3d3d3d1";
  homeInfoPara.textContent = `# Home / todos: `;
  todoCounter.textContent = "0";

  homeBtn.textContent = "# Home";
  homeBtn.classList.add("projects-btns");
  // Create project and project container for Home
  const todoAddBtn = document.createElement("button");
  const todosProject = document.createElement("div");
  const h3 = document.createElement("h3");
  h3.textContent = "Home";
  todosProject.classList.add("project-container");

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

  // Append Childs
  todosProject.append(h3, todoAddBtn);
  todosContainer.appendChild(todosProject);

  homeBtn.addEventListener("click", showTodoSection);

  homeInfoPara.appendChild(todoCounter);
  projectsDiv.append(addBtn, homeBtn);
  homeInfo.appendChild(homeInfoPara);
  projectsContainer.appendChild(homeInfo);
};

//todo
const dialogTodo = document.querySelector(".todo-dialog");
const cancelTodoBtn = document.querySelector("#cancel-todo");
const createTodoBtn = document.querySelector("#create-todo");

createTodoBtn.addEventListener("click", () => {
  const projectContainers = document.querySelectorAll(".project-container");
  // Create Todo
  projectContainers.forEach((container) => {
    if (container.style.display === "block") {
      const header = container.firstChild.textContent;
      createNewTodo(
        header,
        inputTitle,
        inputDescription,
        inputDate,
        inputPriority
      );
    }
  });
});

cancelTodoBtn.addEventListener("click", () => {
  dialogTodo.close();
});

const renderTodo = (
  inputTitle,
  inputDescription,
  inputDate,
  newTodo,
  activeHeader
) => {
  const todosDiv = document.createElement("div");
  const todo = document.createElement("div");
  const inputDiv = document.createElement("div");
  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const description = document.createElement("p");
  const dueDate = document.createElement("p");
  const btnsDiv = document.createElement("div");
  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");

  todo.classList.add("todo");
  inputDiv.classList.add("todo-check");
  btnsDiv.classList.add("todo-btns");

  deleteBtn.textContent = "Delete";
  editBtn.textContent = "edit";

  // set attribute
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", "todo");
  checkbox.setAttribute("name", "todo");
  label.setAttribute("for", "todo");

  // Include date-fns to show date in another format\
  let normalDate = inputDate.value || inputDate;
  let result = formatDistanceToNow(inputDate.value || inputDate, {
    addSuffix: true,
  });

  dueDate.textContent = result;

  label.textContent = newTodo.title;
  description.textContent = newTodo.description;

  // Add event listener for edit button
  editBtn.addEventListener("click", () => {
    generateEditTodoDialog(
      newTodo,
      activeHeader,
      newTodo,
      label,
      description,
      dueDate,
      normalDate
    );
  });

  // Mark todo as completed
  checkbox.addEventListener("change", () => {
    projectLoader.projects.forEach((project, index) => {
      if (checkbox.checked) {
        markTodoAsCompleted(inputDiv, newTodo);

        // Update Completed Status in Local Storage
        if (project.name === activeHeader) {
          updateProjectsInLocalStorage(index);
        }
      } else {
        UnmarkTodoAsCompleted(inputDiv, newTodo);

        // Update Completed Status in Local Storage
        if (project.name === activeHeader) {
          updateProjectsInLocalStorage(index);
        }
      }
    });
  });

  // Set id for edit button
  editBtn.setAttribute("id", label.textContent);

  // Append Childs
  btnsDiv.append(editBtn, deleteBtn);
  inputDiv.append(checkbox, label);
  todo.append(inputDiv, description, dueDate, btnsDiv);
  todosDiv.appendChild(todo);

  // Find the corresponding project container
  const projectContainers = document.querySelectorAll(".project-container");
  projectContainers.forEach((container) => {
    const h3 = container.querySelector("h3");
    if (h3.textContent === activeHeader) {
      container.appendChild(todosDiv);
    }
  });

  // Delete Todo Event
  deleteBtn.addEventListener("click", () => {
    deleteTodo(todo, activeHeader, label.textContent);
    // Update project info
    const projectInfos = document.querySelectorAll(".project-info span");
    for (let i = 0; i < projectInfos.length; i++) {
      projectInfos[i].textContent = projectLoader.projects[i].todos.length;
    }
  });

  // Update project info
  const projectInfos = document.querySelectorAll(".project-info span");
  for (let i = 0; i < projectInfos.length; i++) {
    projectInfos[i].textContent = projectLoader.projects[i].todos.length;
  }

  // Clear inputs and close dialog
  if (typeof inputTitle !== "string") {
    inputTitle.value = "";
    inputDescription.value = "";
    inputDate.value = "";
    dialogTodo.close();
  }
};
