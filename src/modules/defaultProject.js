export { defaultProject };
import { projectLoader } from "./projects.js";
import { renderDefaultProject } from "./domModule.js";

const defaultProject = () => {
  projectLoader.createProject("Home", "Default");
  renderDefaultProject();
};
