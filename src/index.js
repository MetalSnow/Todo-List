import "./style.css";
import { CreateTodo } from "./modules/createTodos.js";
import { project } from "./modules/projects.js";
import { setPriority } from "./modules/setPriority.js";
import { markTodoAsComplete } from "./modules/markTodoAsComplete.js";
import projectIcon from "./icons/addProject.png";

function screenController() {
  const projectsDiv = document.querySelector(".projects");
  const todosDiv = document.querySelector(".todo-list");
  const cancelBtn = document.querySelector("#cancel");
  const dialog = document.querySelector("dialog");

  // implement add icon
  const myIcon = new Image();
  myIcon.src = projectIcon;
  myIcon.classList.add("plus");

  const addBtn = document.createElement("button");
  addBtn.id = "addBtn";
  addBtn.textContent = `New Project`;
  addBtn.insertBefore(myIcon, addBtn.firstChild);

  const Home = document.createElement("button");
  Home.textContent = "# Home";

  //Projects dialog
  addBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  cancelBtn.addEventListener("click", () => {
    dialog.close();
  });

  projectsDiv.append(addBtn, Home);

  const projectLoader = project();

  const createProject = () => {
    let inputName = document.querySelector("#name");
    let inputColor = document.querySelector("#color");
    const projectContainer = document.querySelector(".project-list");
    const projectsDiv = document.createElement("div");
    const projectsCounter = document.querySelector(".proNum");
    const h3 = document.createElement("h3");

    h3.textContent = "My Projects";

    projectLoader.createProject(inputName.value, inputColor.value);
    h3.textContent = `# ${inputName.value}`;
    projectsDiv.style.backgroundColor = `light${inputColor.value}`;

    projectsDiv.appendChild(h3);
    projectContainer.appendChild(projectsDiv);
    console.log(projectLoader.projects);

    inputName.value = "";
    inputColor.value = "";
    projectsCounter.textContent = projectLoader.projects.length;
    dialog.close();
  };

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
