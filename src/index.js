import { CreateTodo } from "./modules/createTodos.js";
import { project } from "./modules/projects.js";

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
