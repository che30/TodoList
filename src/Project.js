export default class Project {
  constructor(name, number) {
    this.name = name;
    this.number = number;
    this.tasks = [];
  }

  storeProject() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push({
      name: this.name,
      number: this.number,
      tasks: this.tasks,
    });
    localStorage.setItem('projects', JSON.stringify(projects));
  }
}
