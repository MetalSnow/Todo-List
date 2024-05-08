export {
  projectsContainer,
  todosContainer,
  projectsDiv,
  showProjectsBtn,
  projectsCounter,
  cancelBtn,
  dialogProject,
  dialogTodo,
  cancelTodoBtn,
  createBtn,
  addBtn,
  createTodoBtn,
  dialogEdit,
  confirmEditBtn,
  cancelEditBtn,
  EditInputTitle,
  EditInputDescription,
  EditInputDate,
  EditInputPriority,
};

//project
const projectsContainer = document.querySelector(".project-list");
const todosContainer = document.querySelector(".todo-list");
const projectsDiv = document.querySelector(".projects");
const showProjectsBtn = document.querySelector("#myProjects");
const projectsCounter = document.querySelector(".proNum");
const cancelBtn = document.querySelector("#cancel");
const dialogProject = document.querySelector(".CreateProject");
//todo
const dialogTodo = document.querySelector(".CreateTodo");
const cancelTodoBtn = document.querySelector("#cancel-todo");
const createBtn = document.querySelector("#create-pro");
const addBtn = document.createElement("button");
const createTodoBtn = document.querySelector("#create-todo");
//edit
const dialogEdit = document.querySelector(".edit-todo");
const cancelEditBtn = document.querySelector("#cancel-edit");
const confirmEditBtn = document.querySelector("#edit-todo");
const EditInputTitle = document.querySelector("#edit-title");
const EditInputDescription = document.querySelector("#edit-description");
const EditInputDate = document.querySelector("#edit-date");
const EditInputPriority = document.querySelector("#edit-priority");
