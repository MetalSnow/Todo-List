export { createProject };
import { projectLoader } from "./projects.js";
import { renderProject } from "./domModule.js";
import { saveProjectIntoLocalStorage } from "./localStorage.js";

const createProject = (inputName, inputColor) => {
  for (let i = 0; i < projectLoader.projects.length; i++) {
    if (inputName.value.trim() === "") {
      // Check if inputName is filled
      alert("Please Enter Project's Name!");
      return;
    } else if (projectLoader.projects[i].name === inputName.value.trim()) {
      // Check if project already exist
      alert("Project's name already exist.");
      return;
    }
  }
  console.log(projectLoader.projects);
  // Create project
  projectLoader.createProject(inputName.value.trim(), inputColor.value);

  // Render project
  renderProject(inputName, inputColor);

  // Save project in the local storage
  saveProjectIntoLocalStorage();
};
