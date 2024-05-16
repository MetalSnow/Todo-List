export { createNewTodo };
import { todoIdCounter } from "../index.js";
import { projectLoader } from "./projects.js";
import { renderTodo } from "./domModule";

class CreateTodo {
  constructor(id, title, description, dueDate, priority, completed) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }
}

const createNewTodo = (activeHeader) => {
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

  // Increment the counter to generate a unique ID for the todo
  todoIdCounter++;

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
      project.addNewTodo(newTodo);
      renderTodo(
        inputTitle,
        inputDescription,
        inputDate,
        newTodo,
        activeHeader
      );
    }
  });
};
