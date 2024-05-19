export class CreateTodo {
  constructor(id, title, description, dueDate, priority, completed) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }
}
