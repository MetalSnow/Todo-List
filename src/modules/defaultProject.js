export { defaultProject };
import { projectLoader } from "./projects.js";
import { showTodoSection } from "./showTodos";
import { todoIcon } from "../index.js";
import {
  todosContainer,
  projectsDiv,
  addBtn,
  projectsContainer,
  dialogTodo,
} from "./domModule";

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

  projectsDiv.append(addBtn, homeBtn);
  homeInfo.appendChild(todoCounter);
  projectsContainer.appendChild(homeInfo);
  projectLoader.createProject("Home", "Default");
};
