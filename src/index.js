import "./style.css";
import { CreateTodo } from "./modules/createTodos.js";
import { projectLoader } from "./modules/projects.js";
import { setPriority } from "./modules/setPriority.js";
import {
  markTodoAsCompleted,
  UnmarkTodoAsCompleted,
} from "./modules/markTodo.js";
import projectIcon from "./icons/addProject.png";
import todoIcon from "./icons/addTodo.png";
import { formatDistanceToNow } from "date-fns";

function screenController() {
  const projectsContainer = document.querySelector(".project-list");
  const todosContainer = document.querySelector(".todo-list");
  const projectsDiv = document.querySelector(".projects");
  const showProjectsBtn = document.querySelector("#myProjects");
  const projectsCounter = document.querySelector(".proNum");
  const cancelBtn = document.querySelector("#cancel");
  const dialogProject = document.querySelector(".CreateProject");
  const dialogTodo = document.querySelector(".CreateTodo");
  const cancelTodoBtn = document.querySelector("#cancel-todo");

  // implement add icon
  const myIcon = new Image();
  myIcon.src = projectIcon;
  myIcon.classList.add("plus");

  const addBtn = document.createElement("button");
  addBtn.id = "addBtn";
  addBtn.textContent = `New Project`;
  addBtn.insertBefore(myIcon, addBtn.firstChild);

  //Projects dialog
  addBtn.addEventListener("click", () => {
    dialogProject.showModal();
  });

  cancelBtn.addEventListener("click", () => {
    dialogProject.close();
  });

  // Create Default Project
  const defaultProject = () => {
    const homeBtn = document.createElement("button");
    const homeInfo = document.createElement("div");
    const todoCounter = document.createElement("span");

    homeInfo.style.backgroundColor = "white";
    homeInfo.classList.add("project-info");
    homeInfo.textContent = `# Home / todos: `;
    todoCounter.textContent = "0";

    homeBtn.textContent = "# Home";
    // Create project and project container for Home
    const todoAddBtn = document.createElement("button");
    const todosProject = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = "Home";
    todosProject.classList.add("project-container");

    // Implement add icon
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

    projectsDiv.append(addBtn, homeBtn);
    homeInfo.appendChild(todoCounter);
    projectsContainer.appendChild(homeInfo);
    projectLoader.createProject("Home", "Default");
  };

  // Create Project
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
    const projectsInfo = document.createElement("div");
    const todoCounter = document.createElement("span");
    projectsInfo.textContent = `# ${inputName.value} / todos: `;
    todoCounter.textContent = "0";
    projectsBtn.textContent = `# ${inputName.value}`;
    projectsBtn.style.backgroundColor = `light${inputColor.value}`;
    projectsInfo.style.backgroundColor = `light${inputColor.value}`;
    projectsInfo.classList.add("project-info");
    projectsInfo.setAttribute("id", "");
    projectsInfo.appendChild(todoCounter);
    projectsContainer.appendChild(projectsInfo);
    projectsDiv.appendChild(projectsBtn);

    // Create project and project container
    projectLoader.createProject(inputName.value, inputColor.value);

    const todosProject = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = inputName.value;
    todosProject.classList.add("project-container");
    todosProject.style.display = "block";

    // Implement add icon
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
  };

  // Create Todo
  const createTodo = (activeHeader) => {
    const inputTitle = document.querySelector("#title");
    const inputDescription = document.querySelector("#description");
    const inputDate = document.querySelector("#date");
    const inputPriority = document.querySelector("#priority");

    // Check if inputs are filled
    if (
      inputTitle.value === "" ||
      inputDescription.value === "" ||
      inputDate.value === ""
    ) {
      alert("Please Fill The Required Fields");
      return;
    }

    const todosDiv = document.createElement("div");
    const todo = document.createElement("div");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const description = document.createElement("p");
    const dueDate = document.createElement("p");

    todo.classList.add("todo");

    // set attribute
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", "todo");
    checkbox.setAttribute("name", "todo");
    label.setAttribute("for", "todo");

    // Include date-fns to show date
    const result = formatDistanceToNow(inputDate.value, { addSuffix: true });
    dueDate.textContent = result;

    projectLoader.projects.forEach((project) => {
      if (project.name === activeHeader) {
        const newTodo = new CreateTodo(
          inputTitle.value,
          inputDescription.value,
          inputDate.value,
          inputPriority.value,
          false
        );
        project.addNewTodo(newTodo);
        label.textContent = newTodo.title;
        description.textContent = newTodo.description;
        console.log(activeHeader);
        console.log(projectLoader.projects);

        // Mark todo as completed
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            console.log("Checkbox is checked..");
            markTodoAsCompleted(label, newTodo);
          } else {
            console.log("Checkbox is not checked..");
            UnmarkTodoAsCompleted(label, newTodo);
          }
        });
      }
    });

    // Append Childs
    todo.append(checkbox, label, description, dueDate);
    todosDiv.appendChild(todo);

    // Find the corresponding project container
    const projectContainers = document.querySelectorAll(".project-container");
    projectContainers.forEach((container) => {
      const h3 = container.querySelector("h3");
      if (h3.textContent === activeHeader) {
        container.appendChild(todosDiv);
      }
    });

    // Clear inputs
    inputTitle.value = "";
    inputDescription.value = "";
    inputDate.value = "";

    dialogTodo.close();
  };

  // Show todo list for each project
  const createTodoBtn = document.querySelector("#create-todo");

  createTodoBtn.addEventListener("click", () => {
    const projectContainers = document.querySelectorAll(".project-container");
    const projectInfos = document.querySelectorAll(".project-info span");

    // Create Todo
    projectContainers.forEach((container) => {
      if (container.style.display === "block") {
        const header = container.firstChild.textContent;
        createTodo(header);
      }
    });

    // Update project info
    for (let i = 0; i < projectInfos.length; i++) {
      projectInfos[i].textContent = projectLoader.projects[i].todos.length;
    }
  });

  const showTodoSection = (event) => {
    projectsContainer.style.display = "none";
    todosContainer.style.display = "block";
    const targetName = event.target.textContent.split("# ")[1];
    const projectsContainers = document.querySelectorAll(".project-container");
    projectsContainers.forEach((container) => {
      const containerName = container.querySelector("h3").textContent;
      if (containerName === targetName) {
        container.style.display = "block";
      } else {
        container.style.display = "none";
      }
    });

    console.log(projectLoader.projects);

    projectsContainer.style.display = "none";
    todosContainer.style.display = "block";
  };

  defaultProject();

  //Todo dialog
  cancelTodoBtn.addEventListener("click", () => {
    dialogTodo.close();
  });

  showProjectsBtn.addEventListener("click", () => {
    projectsContainer.style.display = "block";
    todosContainer.style.display = "none";
  });

  return {
    createProject,
  };
}

const render = screenController();

const createBtn = document.querySelector("#create-pro");

createBtn.addEventListener("click", render.createProject);

//Create First Todo
const firstTodo = new CreateTodo(
  "Valorant",
  "play many games",
  "28 March",
  "First"
);

//Create Second Todo
const secondTodo = new CreateTodo(
  "League of Legends",
  "play one game",
  "4/20/2024",
  "Second"
);
