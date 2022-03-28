export default class Task {
  constructor(description, date, priority, createBy) {
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.createBy = createBy;
  }
}