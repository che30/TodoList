import UI from './UI.js';
import Project from './Project.js';
import { startOfYesterday } from 'date-fns';

class Task {
  constructor(title, description, date) {
    this.title = title;
    this.description = description;
    this.description = date;
  }
}
window.removeProject = (projectNumber) => {
  const projects = UI.getProjectName();
  projects.forEach((project, index) => {
    if (project.number === projectNumber) {
      projects.splice(index, 1);
    }
  });
  document.getElementById(projectNumber).parentNode.remove();
  localStorage.setItem('projects', JSON.stringify(projects));
  UI.addProjectName();
  UI.showAlert('Project Removed', 'success');
  setTimeout(() => {
    window.location.reload();
  }, 3000);
};

const dpBtn = document.getElementById('dp-btn');
let visible = false;
dpBtn.addEventListener('click', () => {
  const projectForm = document.getElementById('project-form');
  if (visible === false) {
    projectForm.classList.remove('d-none');
    projectForm.classList.add('d-block');
    visible = true;
  } else {
    visible = false;
    projectForm.classList.remove('d-block');
    projectForm.classList.add('d-none');
  }
});
const welcomBtn = document.getElementById('btnOne');
let visibleTwo = false;
welcomBtn.addEventListener('click', () => {
  const tableOne = document.querySelector('#tableone');
  if (visibleTwo === false) {
    tableOne.classList.remove('d-none');
    tableOne.classList.add('d-block');
    visibleTwo = true;
  } else {
    tableOne.classList.remove('d-block');
    tableOne.classList.add('d-none');
    visibleTwo = false;
  }
});
const sored = UI.getProjectName()
sored.forEach(element => {
  const sectionTwo = document.getElementById('tableone');
const newDiv = document.createElement('div');
newDiv.classList.add('text-center','proj');
newDiv.id ='newDiv'
newDiv.innerHTML = element.name

const addBtn = document.createElement('div');
sectionTwo.appendChild(newDiv)
addBtn.id = element.number
addBtn.innerHTML = '<span>+<span><span >Add task<span> '
addBtn.style.fontSize= '1rem'
addBtn.style.cursor = 'pointer'
addBtn.classList.add('rounded-circle');
newDiv.appendChild(addBtn)
});

// newDiv.innerHTML = project.name ;
// const addBtn = document.createElement('div');
// addBtn.id = 'taskbtn'
// addBtn.innerHTML = '<span>+<span><span >Add task<span> '
// addBtn.style.fontSize= '1rem'
// addBtn.style.cursor = 'pointer'
// addBtn.classList.add('rounded-circle');
document.querySelector('#project-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  const title = document.querySelector('#title').value;
  // const description = document.querySelector('#description').value;
  // const date = document.querySelector('#date').value
  if (title === '') {
    UI.showAlert('Please fill in all fields', 'danger');
    setTimeout(() => {
      window.location.reload();
    }, 3000);
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
const proj= document.querySelector('.proj')


document.addEventListener('DOMContentLoaded', UI.addProjectName());


// localStorage.clear()