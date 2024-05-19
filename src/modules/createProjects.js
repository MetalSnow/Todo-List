export { createProject };
import { projectLoader } from "./projects.js";
import { renderProject } from "./domModule.js";
import { saveProjectIntoLocalStorage } from "./localStorage.js";

const createProject = (inputName, inputColor) => {
  // Check if inputName is filled
  if (inputName.value === "") {
    alert("Please Enter Project's Name!");
    return;
  }

  // Create project
  projectLoader.createProject(inputName.value, inputColor.value);

  // Render project
  renderProject(inputName, inputColor);

  // Save project in the local storage
  saveProjectIntoLocalStorage();
};
