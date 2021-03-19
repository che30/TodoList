
import Project from './Project';
import Task from './Task';

export default class UI {
  static addActiveProjectTask() {
    const allTask = Task.getTask();
    const allProjects = UI.getProjectName();
    let giveMeActiveProject = Number(UI.getSelected()[0]) || 0;
    if (giveMeActiveProject === '') {
      giveMeActiveProject = 0;
    }
    const sectionOne = document.getElementById('section-1');

    const mainTaskContain = document.createElement('div');
    const title = document.createElement('h4');
    if (allTask.length !== 0) {
      sectionOne.innerHTML = '';
      allTask.forEach(task => {
        if (task.createBy === allProjects[giveMeActiveProject].name) {
          sectionOne.classList.remove('d-none');
          sectionOne.classList.add('d-block', 'mt-3');
          const taskTitle = document.createElement('h5');
          taskTitle.innerHTML = task.title;
          mainTaskContain.classList.add('d-flex', 'flex-wrap', 'justify-content-around');
          mainTaskContain.id = task.id;
          taskTitle.classList.add('text-success', 'bg-grey', 'card-title');
          const cardContain = document.createElement('div');
          cardContain.classList.add('card');
          const cardBody = document.createElement('div');
          cardBody.classList.add('card-body');
          const taskDate = document.createElement('p');
          taskDate.innerHTML = task.date;
          const containAction = document.createElement('div');
          const edit = document.createElement('span');
          edit.innerHTML = '<i class="fas fa-edit"></i>';
          edit.id = task.now;
          edit.setAttribute('onclick', `editTask(${task.now})`);
          const del = document.createElement('span');
          del.innerHTML = '<i class="fas ml-5 fa-trash-alt" ></i>';
          del.id = task.now;
          del.setAttribute('onclick', `removeTask(${task.now})`);
          del.classList.add('text-danger');
          taskDate.classList.add('card-text');
          const taskDescription = document.createElement('p');
          taskDescription.innerHTML = task.description;
          cardContain.style.background = `${UI.renderColours(task.priority)}`;
          title.innerHTML = task.createBy;
          title.classList.add('text-center');
          containAction.appendChild(edit);
          containAction.appendChild(del);
          cardBody.appendChild(taskTitle);
          cardBody.appendChild(taskDescription);
          cardBody.appendChild(taskDate);
          cardBody.appendChild(containAction);
          cardContain.appendChild(cardBody);
          mainTaskContain.appendChild(cardContain);
          sectionOne.appendChild(mainTaskContain);
          let read = false;
          cardBody.addEventListener('click', () => {
            if (read === false) {
              cardBody.classList.add('bg-dark');
              read = true;
            } else {
              cardBody.classList.remove('bg-dark');
              read = false;
            }
          });
        }
      });
      const plusBtn = document.createElement('div');
      plusBtn.innerHTML = '+';
      plusBtn.style.fontSize = '50px';
      sectionOne.appendChild(mainTaskContain);
      sectionOne.insertBefore(title, sectionOne.firstChild);
      sectionOne.appendChild(plusBtn);
      plusBtn.addEventListener('click', () => {
        const taskForm = document.getElementById('task-form');
        taskForm.classList.remove('d-none');
        taskForm.classList.add('d-block');
      });
    }
  }


  static displayAddTask() {
    const sectionOne = document.getElementById('section-1');
    sectionOne.classList.remove('d-none');
    sectionOne.classList.add('d-block');
  }

  static renderSelected(element) {
    const storedProjects = UI.getProjectName();
    const mainContain = document.getElementById('sideNavListchild');
    mainContain.innerHTML = '';
    UI.renderDefault();
    storedProjects.forEach(project => {
      if (project.number !== 0) {
        const nextElement = document.createElement('li');
        nextElement.innerHTML = `${project.name}<i class="fas ml-5 fa-trash-alt" ></i>`;
        nextElement.classList.add('text-white', 'text-center', 'mt-4', 'list-unstyled');
        nextElement.id = project.number;
        if (Number(element[0]) === Number(nextElement.id)) {
          nextElement.classList.add('text-danger');
          UI.synchro(nextElement);
        }
        nextElement.style.cursor = 'pointer';
        mainContain.appendChild(nextElement);
        nextElement.children[0].setAttribute('onclick', `removeProject(${project.number})`);
      }
    });
  }

  static renderRefresh() {
    const currentItemId = UI.getSelected();
    UI.renderSelected(currentItemId);
  }
}
// index starts here
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


document.addEventListener('DOMContentLoaded',
  UI.addProjectName(),
  UI.renderRefresh(),
  UI.addActiveProjectTask());
