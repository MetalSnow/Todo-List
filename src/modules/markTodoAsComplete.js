export const markTodoAsComplete = (todoId) => {
  todoId.style.opacity = "0.6";
  todoId.title.style = "text-decoration-line: line-through;";
};
