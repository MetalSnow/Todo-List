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
  const todoAddBtn = document.createElement("button");

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
    const projectsBtn = document.createElement("button");
    const projectsInfo = document.createElement("div");

    projectLoader.createProject(inputName.value, inputColor.value);
    projectsInfo.textContent = `# ${inputName.value} / todos: ${projectLoader.projects[0].todos.length}`;
    projectsBtn.textContent = `# ${inputName.value}`;
    projectsBtn.style.backgroundColor = `light${inputColor.value}`;
    projectsInfo.style.backgroundColor = `light${inputColor.value}`;

    projectsContainer.appendChild(projectsInfo);
    projectsDiv.appendChild(projectsBtn);
    console.log(projectLoader.projects);

    inputName.value = "";
    projectsCounter.textContent = projectLoader.projects.length;

    projectsBtn.addEventListener("click", showTodoSection);
    dialogProject.close();
  };

  const allButtons = projectsDiv.querySelectorAll("button");

  const showTodoSection = (event) => {
    // Remove Todo Content
    while (todosContainer.hasChildNodes()) {
      todosContainer.removeChild(todosContainer.firstChild);
    }

    //DOM
    const h3 = document.createElement("h3");
    const todosDiv = document.createElement("div");
    // const todo = document.createElement("div");
    // const checkbox = document.createElement("input");
    // const label = document.createElement("label");
    // const description = document.createElement("p");

    h3.textContent = event.target.textContent;
    let targetName = h3.textContent.split("# ")[1];

    // // set attribute for checkbox input element
    // checkbox.setAttribute("type", "checkbox");
    // checkbox.setAttribute("id", "todo");
    // checkbox.setAttribute("name", "todo");

    // // set attribute for label element
    // label.setAttribute("for", "todo");

    // Implement add icon
    const myTodoIcon = new Image();
    myTodoIcon.src = todoIcon;
    myTodoIcon.classList.add("plus");

    todoAddBtn.id = "todoAddBtn";
    todoAddBtn.textContent = `Add Task`;
    todoAddBtn.insertBefore(myTodoIcon, todoAddBtn.firstChild);

    todosContainer.append(h3, todoAddBtn);

    // Show todo list for each project
    const createTodoBtn = document.querySelector("#create-todo");

    const createTodo = () => {
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
        if (project.name === targetName) {
          const newTodo = new CreateTodo(
            inputTitle.value,
            inputDescription.value,
            inputDate.value,
            inputPriority.value
          );
          project.todos.push(newTodo);
          label.textContent = newTodo.title;
          description.textContent = newTodo.description;
          console.log(project);
        }
      });

      // Append Childs
      todo.append(checkbox, label, description);
      todosDiv.appendChild(todo);
    };

    createTodoBtn.addEventListener("click", createTodo);

    //Todo dialog
    todoAddBtn.addEventListener("click", () => {
      dialogTodo.showModal();
    });

    cancelTodoBtn.addEventListener("click", () => {
      dialogTodo.close();
    });

    todosContainer.appendChild(todosDiv);

    projectsContainer.style.display = "none";
    todosContainer.style.display = "block";
  };

  // Iterate over each button and add an event listener, excluding the two buttons
  allButtons.forEach((button) => {
    if (button !== addBtn && button !== showProjectsBtn) {
      button.addEventListener("click", showTodoSection);
    }
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
