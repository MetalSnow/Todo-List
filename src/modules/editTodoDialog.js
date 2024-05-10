export { generateEditTodoDialog };
import { editTodo } from "./editTodo";

const generateEditTodoDialog = (
  todo,
  activeHeader,
  newTodo,
  label,
  description,
  dueDate,
  normalDate
) => {
  // Create dialog element
  const dialogEdit = document.createElement("dialog");
  dialogEdit.classList.add("edit-todo");

  // Add custom data attribute to identify the associated todo
  dialogEdit.dataset.todoId = todo.id; // Assuming todo has an id property

  // Create dialog content
  const h3 = document.createElement("h3");
  h3.textContent = "Edit Task";
  dialogEdit.appendChild(h3);

  const div = document.createElement("div");

  const labelTitle = document.createElement("label");
  labelTitle.setAttribute("for", "edit-title");
  labelTitle.textContent = "Title :";
  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("id", "edit-title");
  inputTitle.setAttribute("name", "edit-title");
  inputTitle.setAttribute("placeholder", "Enter Title");
  inputTitle.value = label.textContent;
  div.appendChild(labelTitle);
  div.appendChild(inputTitle);

  // Repeat the same process for other input fields...
  const labelDescription = document.createElement("label");
  labelDescription.setAttribute("for", "edit-description");
  labelDescription.textContent = "Description :";
  const inputDescription = document.createElement("input");
  inputDescription.setAttribute("type", "text");
  inputDescription.setAttribute("id", "edit-description");
  inputDescription.setAttribute("name", "edit-description");
  inputDescription.setAttribute("placeholder", "Write Description");
  inputDescription.value = description.textContent;
  div.appendChild(labelDescription);
  div.appendChild(inputDescription);

  const labelDate = document.createElement("label");
  labelDate.setAttribute("for", "edit-date");
  labelDate.textContent = "Due Date :";
  const inputDate = document.createElement("input");
  inputDate.setAttribute("type", "date");
  inputDate.setAttribute("id", "edit-date");
  inputDate.setAttribute("name", "edit-date");
  inputDate.setAttribute("min", "2024-01-01");
  inputDate.value = normalDate;
  div.appendChild(labelDate);
  div.appendChild(inputDate);

  const labelPriority = document.createElement("label");
  labelPriority.setAttribute("for", "edit-priority");
  labelPriority.textContent = "Set Priority :";
  const selectPriority = document.createElement("select");
  selectPriority.setAttribute("id", "edit-priority");
  selectPriority.setAttribute("name", "edit-priority");

  const priorities = ["Priority 1", "Priority 2", "Priority 3", "Priority 4"];
  priorities.forEach((priority) => {
    const option = document.createElement("option");
    option.value = priority;
    option.textContent = priority;
    selectPriority.appendChild(option);
  });

  div.appendChild(labelPriority);
  div.appendChild(selectPriority);

  // Create cancel button
  const cancelButton = document.createElement("button");
  cancelButton.setAttribute("id", "cancel-edit");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", () => {
    dialogEdit.close();
    dialogEdit.remove(); // Remove the dialog from the DOM
  });

  // Create confirm button
  const confirmButton = document.createElement("button");
  confirmButton.setAttribute("id", "edit-todo");
  confirmButton.textContent = "Confirm";
  confirmButton.addEventListener("click", () => {
    // Pass the newTodo object to the editTodo function
    editTodo(
      activeHeader,
      newTodo,
      label,
      description,
      dueDate,
      inputTitle,
      inputDescription,
      inputDate,
      selectPriority
    );
    dialogEdit.close();
    // dialogEdit.remove(); // Remove the dialog from the DOM
  });

  div.appendChild(cancelButton);
  div.appendChild(confirmButton);
  dialogEdit.appendChild(div);

  // Append dialog to the document body
  document.body.appendChild(dialogEdit);

  // Show the edit dialog
  dialogEdit.showModal();
};
