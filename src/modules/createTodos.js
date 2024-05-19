export { createNewTodo };
import { todoIdCounter } from "../index.js";
import { projectLoader } from "./projects.js";
import { renderTodo } from "./domModule";
import { CreateTodo } from "./todos.js";
import { saveTodoIntoLocalStorage } from "./localStorage.js";

const createNewTodo = (
  activeHeader,
  inputTitle,
  inputDescription,
  inputDate,
  inputPriority
) => {
  // Check if inputs are filled
  if (
    inputTitle.value === "" ||
    inputDescription.value === "" ||
    inputDate.value === ""
  ) {
    alert("Please Fill The Required Fields");
    return;
  }

  // Increment the counter to generate a unique ID for the todo
  todoIdCounter++;

  const allProjects = projectLoader.projects;

  projectLoader.projects.forEach((project) => {
    if (project.name === activeHeader) {
      const newTodo = new CreateTodo(
        todoIdCounter,
        inputTitle.value,
        inputDescription.value,
        inputDate.value,
        inputPriority.value,
        false
      );
      project.todos.push(newTodo);
      renderTodo(
        inputTitle,
        inputDescription,
        inputDate,
        newTodo,
        activeHeader
      );
      saveTodoIntoLocalStorage(allProjects.indexOf(project));
    }
  });
};
