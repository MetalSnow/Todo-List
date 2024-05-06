export { markTodoAsCompleted, UnmarkTodoAsCompleted };

const markTodoAsCompleted = (todoContainer, todoStatus) => {
  todoContainer.parentElement.style.opacity = "0.5";
  todoContainer.style = "text-decoration-line: line-through;";

  todoStatus.completed = true;
};

const UnmarkTodoAsCompleted = (todoContainer, todoStatus) => {
  todoContainer.parentElement.style.opacity = "";
  todoContainer.style = "";

  todoStatus.completed = false;
};
