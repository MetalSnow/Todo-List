export { createNewTodo };
import { formatDistanceToNow } from "date-fns";
import {
  markTodoAsCompleted,
  UnmarkTodoAsCompleted,
  todoIdCounter,
} from "../index.js";
import { projectLoader } from "./projects.js";
import { dialogTodo } from "./domModule";
import { deleteTodo } from "./deleteTodo.js";
import { generateEditTodoDialog } from "./editTodoDialog.js";

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

  const todosDiv = document.createElement("div");
  const todo = document.createElement("div");
  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const description = document.createElement("p");
  const dueDate = document.createElement("p");
  const btnsDiv = document.createElement("div");
  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");

  todo.classList.add("todo");

  deleteBtn.textContent = "Delete";
  editBtn.textContent = "edit";

  // set attribute
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", "todo");
  checkbox.setAttribute("name", "todo");
  label.setAttribute("for", "todo");

  // Include date-fns to show date in another format
  const normalDate = inputDate.value;
  const result = formatDistanceToNow(inputDate.value, { addSuffix: true });
  dueDate.textContent = result;

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
      label.textContent = newTodo.title;
      description.textContent = newTodo.description;

      // Add event listener for edit button
      editBtn.addEventListener("click", () => {
        generateEditTodoDialog(
          newTodo,
          activeHeader,
          newTodo,
          label,
          description,
          dueDate,
          normalDate
        );
      });

      // Mark todo as completed
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          markTodoAsCompleted(label, newTodo);
        } else {
          UnmarkTodoAsCompleted(label, newTodo);
        }
      });
    }
  });

  // Set id for edit button
  editBtn.setAttribute("id", label.textContent);

  // Append Childs
  btnsDiv.append(editBtn, deleteBtn);
  todo.append(checkbox, label, description, dueDate, btnsDiv);
  todosDiv.appendChild(todo);

  // Find the corresponding project container
  const projectContainers = document.querySelectorAll(".project-container");
  projectContainers.forEach((container) => {
    const h3 = container.querySelector("h3");
    if (h3.textContent === activeHeader) {
      container.appendChild(todosDiv);
    }
  });

  // Delete Todo Event
  deleteBtn.addEventListener("click", () => {
    deleteTodo(todo, activeHeader, label.textContent);
  });

  // Clear inputs
  inputTitle.value = "";
  inputDescription.value = "";
  inputDate.value = "";

  dialogTodo.close();
};
