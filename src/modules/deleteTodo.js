export { deleteTodo };
import { updateProjectsInLocalStorage } from "./localStorage";
import { projectLoader } from "./projects";

const deleteTodo = (container, activeHeader, label) => {
  container.remove();

  projectLoader.projects.forEach((project, projectIndex) => {
    let todosArray = project.todos;

    if (project.name === activeHeader) {
      todosArray.forEach((todo, index) => {
        if (todo.title === label) {
          project.todos.splice(index, 1);
        }
        //Update Project In local Storage
        updateProjectsInLocalStorage(projectIndex);
      });
    }
  });
};
