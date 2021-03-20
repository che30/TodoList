
import UI from './UI';
import Project from './Project';
import Task from './Task';

window.removeProject = (projectNumber) => {
  const projects = UI.getProjectName();
  const selectedId = UI.getSelected();
  selectedId.pop();
  localStorage.setItem('selectedId', JSON.stringify(selectedId));
  projects.forEach((project, index) => {
    if (project.number === projectNumber) {
      projects.splice(index, 1);
    }
  });
  document.getElementById(projectNumber).remove();

  let lastindex;
  projects.forEach((project, index) => {
    project.number = index;
    lastindex = index;
  });
  let currentNumber = Number(localStorage.getItem('lastProjectId'));

  currentNumber = Number(lastindex);
  localStorage.setItem('lastProjectId', JSON.stringify(currentNumber));
  localStorage.setItem('projects', JSON.stringify(projects));
  UI.addProjectName();
  UI.showAlert('Project Removed', 'success');
  UI.delay();
};
window.removeTask = (taskNumber) => {
  const tasks = Task.getTask();
  const projects = UI.getProjectName();
  projects.forEach(project => {
    project.tasks.forEach((task, index) => {
      if (Number(task.now) === taskNumber) {
        project.tasks.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
      }
    });
  });


  tasks.forEach((task, index) => {
    if (Number(task.now) === taskNumber) {
      tasks.splice(index, 1);
      document.getElementById(taskNumber).parentNode.parentNode.parentNode.remove();
      localStorage.setItem('tasks', JSON.stringify(tasks));
      UI.showAlert('Task Removed', 'success');
      UI.delay();
    }
  });
  return tasks;
};
window.editTask = (taskNumber) => {
  let toBeEdited;
  const tasks = Task.getTask();
  tasks.forEach((task, index) => {
    if (Number(task.now) === taskNumber) {
      toBeEdited = task;
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
  const projects = UI.getProjectName();
  projects.forEach(project => {
    project.tasks.forEach((task, index) => {
      if (Number(task.now) === taskNumber) {
        project.tasks.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
      }
    });
  });

  document.getElementById(taskNumber);
  document.getElementById('task-form').classList.remove('d-none');
  document.getElementById('task-form').classList.add('d-block');
  document.querySelector('#titletwo').value = toBeEdited.title;
  document.getElementById('description').value = toBeEdited.description;
  document.querySelector('#date').value = toBeEdited.date;
};
const span = document.getElementsByClassName('close')[0];
span.onclick = function () {
  document.getElementById('task-form').classList.remove('d-block');
  document.getElementById('task-form').classList.add('d-none');
};


document.getElementById('project-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();
  const title = document.querySelector('#title').value;
  if (title === '') {
    UI.showAlert('Please fill in all fields', 'danger');
    UI.delay();
  } else {
    const project = new Project(title, UI.countProject());
    UI.storeProjectName(project);
    UI.addProjectName();
    UI.showAlert('project added successfuly', 'success');
    UI.delay();
  }
});
document.getElementById('task-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();
  const title = document.querySelector('#titletwo');
  const description = document.getElementById('description');
  const date = document.querySelector('#date');
  const priority = document.querySelector('input[name="priority"]:checked');
  if (title.value === '' || description.value === '' || date.value === '' || priority === null) {
    UI.showAlert('Please fill in all fields', 'danger');
    UI.delay();
  } else {
    const giveMeActiveProject = JSON.parse(localStorage.getItem('selectedId'));

    const projects = UI.getProjectName();
    if (Number(giveMeActiveProject[0]) === 0) {
      const task = new Task(title.value,
        description.value,
        date.value,
        priority.value,
        Date.now().toString(),
        projects[0].name);
      Task.storeTask(task);
      projects[Number(giveMeActiveProject[0])].tasks.push(task);
      localStorage.setItem('projects', JSON.stringify(projects));
      UI.showAlert('Task added successfuly', 'success');
      UI.clearFields();
    } else {
      const task = new Task(title.value,
        description.value,
        date.value,
        priority.value,
        Date.now().toString(),
        projects[Number(giveMeActiveProject[0])].name);

      Task.storeTask(task);
      projects[Number(giveMeActiveProject[0])].tasks.push(task);
      localStorage.setItem('projects', JSON.stringify(projects));
    }
    UI.showAlert('Task added successfuly', 'success');
    UI.clearFields();
    UI.delay();
  }
});

document.addEventListener('DOMContentLoaded', UI.addProjectName());