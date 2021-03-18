/* eslint-disable  consistent-return */
import UI from './UI';
import Project from './Project';
import Task from './Task';

document.getElementById('section-1').classList.add('d-none');
window.removeProject = (projectNumber) => {
  const projects = UI.getProjectName();
  const selectedId = UI.getSelected();
  const tasks = Task.getTask();
  tasks.forEach((task, index) => {
    if (task.createBy === projects[Number(projectNumber)].name) {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
  selectedId.pop();
  UI.storeSelected(selectedId);
  projects.forEach((project, index) => {
    if (project.number === projectNumber) {
      projects.splice(index, 1);
    }
  });
  document.getElementById(projectNumber).remove();
  localStorage.setItem('projects', JSON.stringify(projects));
  UI.addProjectName();
  UI.showAlert('Project Removed', 'success');
  UI.delay();
};
window.removeTask = (taskNumber) => {
  const tasks = Task.getTask();
  tasks.forEach((task, index) => {
    if (Number(task.now) === taskNumber) {
      tasks.splice(index, 1);
      document.getElementById(taskNumber).parentNode.parentNode.parentNode.remove();
      localStorage.setItem('tasks', JSON.stringify(tasks));
      UI.showAlert('Task Removed', 'success');
      UI.delay();
    }
  });
};
window.editTask = (taskNumber) => {
  let toBeEdited;
  const tasks = Task.getTask();
  tasks.forEach((task, index) => {
    if (Number(task.now) === taskNumber) {
      toBeEdited = task;
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      // document.getElementById(taskNumber).parentNode.parentNode.parentNode.remove()
    }
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
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
});
document.getElementById('task-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();
  const title = document.querySelector('#titletwo').value;
  const description = document.getElementById('description').value;
  const date = document.querySelector('#date').value;
  const priority = document.querySelector('input[name="priority"]:checked').value;
  if (title === '' || description === '' || date === '' || priority === undefined) {
    UI.showAlert('Please fill in all fields', 'danger');
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } else {
    const giveMeActiveProject = UI.getSelected();
    const giveStoredProjects = UI.getProjectName();
    if ((giveMeActiveProject.length === 0) || (giveMeActiveProject[0].length === 0)) {
      const task = new Task(title,
        description,
        date,
        priority,
        Date.now().toString(),
        giveStoredProjects[0].name);
      Task.storeTask(task);
    } else {
      const task = new Task(title,
        description,
        date,
        priority,
        Date.now().toString(),
        giveStoredProjects[Number(giveMeActiveProject[0])].name);
      Task.storeTask(task);
    }
    UI.showAlert('Task added successfuly', 'success');
    UI.delay();
  }
});
// UI.renderDefault();
// const giveMeActiveProject = Number(UI.getSelected()[0]);
// renderAddTaskScreen(giveMeActiveProject) ;
document.addEventListener('DOMContentLoaded',
  UI.addProjectName(),
  UI.renderRefresh(),
  UI.addActiveProjectTask());
