import { projectLoader } from "./projects";
export {
  saveProjectIntoLocalStorage,
  saveTodoIntoLocalStorage,
  getDataFromLocalStorage,
  saveDefaultProjectInLocalStorage,
};

const saveDefaultProjectInLocalStorage = () => {
  localStorage.setItem(
    `Project ${0}`,
    JSON.stringify(projectLoader.projects[0])
  );
};

let projectNum = 1;

const saveProjectIntoLocalStorage = () => {
  const projectsLength = projectLoader.projects.length;
  const lastProject = projectLoader.projects[projectsLength - 1];

  //   console.log(JSON.stringify(lastProject));
  localStorage.setItem(`Project ${projectNum++}`, JSON.stringify(lastProject));
  console.log(projectNum);
};

const saveTodoIntoLocalStorage = (projectIndex) => {
  const currentProject = projectLoader.projects[projectIndex];
  localStorage.setItem(
    `Project ${projectIndex}`,
    JSON.stringify(currentProject)
  );
};

const getDataFromLocalStorage = () => {
  // Remove default project
  projectLoader.projects.shift();
  for (let i = 0; i < localStorage.length; i++) {
    let getProject = localStorage.getItem(`Project ${i}`);
    projectLoader.projects.push(JSON.parse(getProject));
  }
  console.log(projectLoader.projects);
};
