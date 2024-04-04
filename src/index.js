import { CreateTodo } from "./modules/createTodos.js";
import { project } from "./modules/projects.js";
import { setPriority } from "./modules/setPriority.js";
import { markTodoAsComplete } from "./modules/markTodoAsComplete.js";
import projectIcon from "./icons/addProject.png";

function screenController() {
  const projectsDiv = document.querySelector(".projects");
  const todosDiv = document.querySelector(".todo-list");

  // implement add icon
  const myIcon = new Image();
  myIcon.src = projectIcon;

  const addBtn = document.createElement("button");
  addBtn.textContent = `New Project`;
  addBtn.insertBefore(myIcon, addBtn.firstChild);

  const Home = document.createElement("button");
  Home.textContent = "# Home";

  projectsDiv.append(addBtn, Home);
}

screenController();

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

//Create New Project
const defaultProject = project();

defaultProject.createProject("Home", "Red");
defaultProject.createProject("My Project", "Blue");
defaultProject.projects[0].addNewTodo(firstTodo);
defaultProject.projects[1].addNewTodo(secondTodo);

console.log(defaultProject);
