export { createNewTodo };
import { formatDistanceToNow } from "date-fns";
import { markTodoAsCompleted, UnmarkTodoAsCompleted } from "../index.js";
import { projectLoader } from "./projects.js";
import { dialogTodo } from "./domModule";
import { deleteTodo } from "./deleteTodo.js";

class CreateTodo {
  constructor(title, description, dueDate, priority, completed) {
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

  const todosDiv = document.createElement("div");
  const todo = document.createElement("div");
  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const description = document.createElement("p");
  const dueDate = document.createElement("p");
  const deleteBtn = document.createElement("button");

  todo.classList.add("todo");

  deleteBtn.textContent = "Delete";

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
  todo.append(checkbox, label, description, dueDate, deleteBtn);
  todosDiv.appendChild(todo);

  // Find the corresponding project container
  const projectContainers = document.querySelectorAll(".project-container");
  projectContainers.forEach((container) => {
    const h3 = container.querySelector("h3");
    if (h3.textContent === activeHeader) {
      container.appendChild(todosDiv);
    }
  });

  //Delete Todo Event
  deleteBtn.addEventListener("click", () => {
    deleteTodo(todo, activeHeader, label.textContent);
  });

  // Clear inputs
  inputTitle.value = "";
  inputDescription.value = "";
  inputDate.value = "";

  dialogTodo.close();
};
