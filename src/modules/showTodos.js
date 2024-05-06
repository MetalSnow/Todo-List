import { projectsContainer, todosContainer } from "./domModule";
export { showTodoSection };

const showTodoSection = (event) => {
  projectsContainer.style.display = "none";
  todosContainer.style.display = "block";

  const targetName = event.target.textContent.split("# ")[1];
  const projectsContainers = document.querySelectorAll(".project-container");

  projectsContainers.forEach((container) => {
    const containerName = container.querySelector("h3").textContent;
    if (containerName === targetName) {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  });

  projectsContainer.style.display = "none";
  todosContainer.style.display = "block";
};
