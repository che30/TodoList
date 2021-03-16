export default class Task {
  constructor(title, description, date,priority,now) {
    this.title = title;
    this.description = description;
    this.description = date;
    this.priority = priority
    this.now = now
  }

  static getTask() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks= JSON.parse(localStorage.getItem('tasks'));

    }

    return   tasks;
  }

  static storeTask(task) {
    const tasks = Task.getTask();
    console.log(Task.getTask())
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
  }
}
//  localStorage.clear()