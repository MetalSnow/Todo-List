import "./style.css";
import { CreateTodo } from "./modules/createTodos.js";
import { project } from "./modules/projects.js";
import { setPriority } from "./modules/setPriority.js";
import { markTodoAsComplete } from "./modules/markTodoAsComplete.js";
import projectIcon from "./icons/addProject.png";
import todoIcon from "./icons/addTodo.png";

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

  //Default Project
  const Home = document.createElement("button");
  const HomeDiv = document.createElement("div");

  HomeDiv.style.backgroundColor = "white";

  Home.textContent = "# Home";

  //Projects dialog
  addBtn.addEventListener("click", () => {
    dialogProject.showModal();
  });

  cancelBtn.addEventListener("click", () => {
    dialogProject.close();
  });

  const projectLoader = project();

  projectsDiv.append(addBtn, Home);
  projectsContainer.appendChild(HomeDiv);
  projectLoader.createProject("Home", "Default");
  HomeDiv.textContent = `# Home / todos: ${projectLoader.projects[0].todos.length}`;

  const createProject = () => {
    let inputName = document.querySelector("#name");
    let inputColor = document.querySelector("#color");

    // Create project button and info
    const projectsBtn = document.createElement("button");
    const todoAddBtn = document.createElement("button");
    const projectsInfo = document.createElement("div");
    projectsInfo.textContent = `# ${inputName.value} / todos: 0`; // Initialize with 0 todos
    projectsBtn.textContent = `# ${inputName.value}`;
    projectsBtn.style.backgroundColor = `light${inputColor.value}`;
    projectsInfo.style.backgroundColor = `light${inputColor.value}`;
    projectsContainer.appendChild(projectsInfo);
    projectsDiv.appendChild(projectsBtn);

    // Create project and project container
    projectLoader.createProject(inputName.value, inputColor.value);

    const todosProject = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = inputName.value;
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

    const createTodo = (activeHeader) => {
      const todosDiv = document.createElement("div");
      const todo = document.createElement("div");
      const checkbox = document.createElement("input");
      const label = document.createElement("label");
      const description = document.createElement("p");
      const inputTitle = document.querySelector("#title");
      const inputDescription = document.querySelector("#description");
      const inputDate = document.querySelector("#date");
      const inputPriority = document.querySelector("#priority");

      // set attribute for checkbox input element
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("id", "todo");
      checkbox.setAttribute("name", "todo");

      // set attribute for label element
      label.setAttribute("for", "todo");

      projectLoader.projects.forEach((project) => {
        if (project.name === activeHeader) {
          const newTodo = new CreateTodo(
            inputTitle.value,
            inputDescription.value,
            inputDate.value,
            inputPriority.value
          );
          project.addNewTodo(newTodo);
          label.textContent = newTodo.title;
          description.textContent = newTodo.description;
          console.log(h3.textContent);
        }
      });
      console.log(projectLoader.projects);
      console.log(h3.textContent);

      // Append Childs
      todo.append(checkbox, label, description);
      todosDiv.appendChild(todo);
      todosProject.appendChild(todosDiv);
    };

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

    // Show todo list for each project
    const createTodoBtn = document.querySelector("#create-todo");

    // createTodoBtn.addEventListener("click", createTodo);
    createTodoBtn.addEventListener("click", () => {
      existingProjectContainers.forEach((container) => {
        if (container.style.display === "block") {
          const header = container.firstChild.textContent;
          createTodo(header);
        }
      });
    });

    // Append new project container to todos container
    todosContainer.appendChild(todosProject);
  };

  // const allButtons = projectsDiv.querySelectorAll("button");

  const showTodoSection = (event) => {
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
