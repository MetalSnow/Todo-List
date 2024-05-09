export { createNewTodo };
import { formatDistanceToNow } from "date-fns";
import { markTodoAsCompleted, UnmarkTodoAsCompleted } from "../index.js";
import { projectLoader } from "./projects.js";
import {
  cancelEditBtn,
  confirmEditBtn,
  dialogEdit,
  dialogTodo,
  EditInputDate,
  EditInputDescription,
  EditInputTitle,
} from "./domModule";
import { deleteTodo } from "./deleteTodo.js";
import { editTodo } from "./editTodo.js";

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

  // Edit buttons Events
  editBtn.addEventListener("click", () => {
    // Edit Inputs
    EditInputTitle.value = label.textContent;
    EditInputDescription.value = description.textContent;
    EditInputDate.value = normalDate;

    dialogEdit.showModal();

    confirmEditBtn.addEventListener("click", () => {
      editTodo(activeHeader, label, description, dueDate);
      dialogEdit.close();
    });
  });

  cancelEditBtn.addEventListener("click", () => {
    dialogEdit.close();
  });

  // Clear inputs
  inputTitle.value = "";
  inputDescription.value = "";
  inputDate.value = "";

  dialogTodo.close();
};
