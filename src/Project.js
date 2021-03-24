export default class Project {
  constructor(name, number) {
    this.name = name;
    this.number = number;
    this.tasks = [];
  }
}
module.exports = Project
