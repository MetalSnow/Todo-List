export { editTodo };
import { formatDistanceToNow } from "date-fns";
import { projectLoader } from "./projects";
import { updateProjectsInLocalStorage } from "./localStorage";

const editTodo = (
  activeHeader,
  todo,
  label,
  description,
  Date,
  EditInputTitle,
  EditInputDescription,
  EditInputDate,
  EditInputPriority
) => {
  projectLoader.projects.forEach((project, index) => {
    let todosArray = project.todos;

    if (project.name === activeHeader) {
      todosArray.forEach((todoItem) => {
        if (todoItem === todo) {
          todo.title = EditInputTitle.value;
          todo.description = EditInputDescription.value;
          todo.dueDate = EditInputDate.value;
          todo.priority = EditInputPriority.value;
        }
      });
      updateProjectsInLocalStorage(index);
    }
  });

  const result = formatDistanceToNow(EditInputDate.value, { addSuffix: true });

  label.textContent = EditInputTitle.value;
  description.textContent = EditInputDescription.value;
  Date.textContent = result;
};
