export default class Task {
  constructor(description, date, priority, createBy) {
    this.description = description;
    this.date = date;
    this.priority = priority;
    // this.now = now;
    this.createBy = createBy;
  }

  // static getTask() {
  //   let tasks = JSON.parse(localStorage.getItem('tasks')) || []
  //   return tasks;
  // }

  // static storeTask(task) {
  //   const tasks = Task.getTask();
  //   tasks.push(task);
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }
}