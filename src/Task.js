export default class Task {
  constructor(title, description, date,number,priority) {
    this.title = title;
    this.description = description;
    this.description = date;
    this.number = number
    this.priority = priority
  }
  static countTask() {
    let currentNumber = Number(localStorage.getItem('lastTakId'));
    if (currentNumber === null) {
      currentNumber = 0;
    } else {
      currentNumber += 1;
      localStorage.setItem('lastTakId', currentNumber);
    }

    return currentNumber;
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