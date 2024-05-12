export { deletProject };
import { projectLoader } from "./projects";

const deletProject = (projectInfo, projectsBtn, todosProject, projectName) => {
  projectInfo.remove();
  projectsBtn.remove();
  todosProject.remove();

  const projectArray = projectLoader.projects;
  projectArray.forEach((project, index) => {
    if (project.name === projectName) {
      projectArray.splice(index, 1);
    }
  });
};
