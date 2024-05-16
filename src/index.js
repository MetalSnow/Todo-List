import "./style.css";
import projectIcon from "./icons/addProject.png";
import todoIcon from "./icons/addTodo.png";
import { defaultProject } from "./modules/defaultProject.js";
export { todoIcon, todoIdCounter, projectIcon };
export {
  markTodoAsCompleted,
  UnmarkTodoAsCompleted,
} from "./modules/markTodo.js";

// Render Default Project
defaultProject();

// Define a counter variable to generate unique IDs
let todoIdCounter = 0;
