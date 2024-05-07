export { deleteTodo };
import { projectLoader } from "./projects";

const deleteTodo = (container, activeHeader, label) => {
  container.remove();

  projectLoader.projects.forEach((project) => {
    let todosArray = project.todos;

    if (project.name === activeHeader) {
      todosArray.forEach((todo) => {
        if (todo.title === label) {
          project.todos.splice(todosArray.indexOf(todo), 1);
        }
      });
    }
  });
};
