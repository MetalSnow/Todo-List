export { markTodoAsCompleted, markTodoAsUncompleted };

const markTodoAsCompleted = (todoContainer, todoStatus) => {
  todoContainer.parentElement.style.opacity = "0.6";
  todoContainer.style = "text-decoration-line: line-through; transaction: 0.3s";

  todoStatus.completed = true;
};

const markTodoAsUncompleted = (todoContainer, todoStatus) => {
  todoContainer.parentElement.style.opacity = "";
  todoContainer.style = "";

  todoStatus.completed = false;
};
