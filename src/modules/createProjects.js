export { createProject };
import { projectLoader } from "./projects.js";
import { renderProject } from "./domModule.js";

const createProject = () => {
  let inputName = document.querySelector("#name");
  let inputColor = document.querySelector("#color");

  // Check if inputName is filled
  if (inputName.value === "") {
    alert("Please Enter Project's Name!");
    return;
  }

  // Create project
  projectLoader.createProject(inputName.value, inputColor.value);

  // Render project
  renderProject(inputName, inputColor);
};
