export { markTodoAsCompleted, UnmarkTodoAsCompleted };

const markTodoAsCompleted = (todoContainer, todoStatus) => {
  todoContainer.parentElement.style =
    "opacity: 0.5;text-decoration-line: line-through;";

  todoStatus.completed = true;
};

const UnmarkTodoAsCompleted = (todoContainer, todoStatus) => {
  todoContainer.parentElement.style = "";

  todoStatus.completed = false;
};
