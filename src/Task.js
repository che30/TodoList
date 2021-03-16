export default class Task {
  constructor(title, description, date,priority,now,createBy) {
    this.title = title;
    this.description = description;
    this.date= date;
    this.priority = priority
    this.now = now
    this.createBy =createBy
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