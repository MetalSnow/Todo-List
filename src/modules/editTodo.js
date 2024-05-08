export { editTodo };
import { formatDistanceToNow } from "date-fns";
import {
  EditInputDate,
  EditInputDescription,
  EditInputPriority,
  EditInputTitle,
} from "./domModule";
import { projectLoader } from "./projects";

const editTodo = (activeHeader, label, description, Date, Priority) => {
  projectLoader.projects.forEach((project) => {
    let todosArray = project.todos;

    if (project.name === activeHeader) {
      todosArray.forEach((todo) => {
        if (todo.title === label.textContent) {
          todo.title = EditInputTitle.value;
          todo.description = EditInputDescription.value;
          todo.dueDate = EditInputDate.value;
          todo.priority = EditInputPriority.value;
        }
      });
    }
  });

  const result = formatDistanceToNow(EditInputDate.value, { addSuffix: true });

  label.textContent = EditInputTitle.value;
  description.textContent = EditInputDescription.value;
  Date.textContent = EditInputDate.value;
  Priority.textContent = EditInputPriority.value;
};
