class Project {
  constructor(name) {
    this.name = name;
  }
}
class Task {
  constructor(title, description, date) {
    this.title = title;
    this.description = description;
    this.description = date;
  }
}
class UI {
  static getProjectName() {
    let projects;
    if (localStorage.getItem('projects') === null) {
      projects = [];
    } else {
      projects = JSON.parse(localStorage.getItem('projects'));
    }

    return projects;
  }

  static storeProjectName(project) {
    const projects = UI.getProjectName();
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static countProject() {
    let currentNumber = Number(localStorage.getItem('lastProjectId'));
    if (currentNumber === null) {
      currentNumber = 0;
    } else {
      currentNumber += 1;
      localStorage.setItem('lastProjectId', currentNumber);
    }

    return currentNumber;
  }

  static getTask() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      projects = JSON.parse(localStorage.getItem('tasks'));
    }

    return tasks;
  }

  static storeTask(task) {
    const tasks = UI.getTask();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify('tasks'));
  }

  static addProjectName() {
    const sideNave = document.getElementById('sideNav')
    const storedProjects = UI.getProjectName() 
    storedProjects.forEach(project => {
      const nextElement = document.createElement('div')
      nextElement.innerHTML = project.name
      nextElement.classList.add('text-white','text-center')
      sideNave.appendChild(nextElement)
    });

  }
}
const defaultName = new Project('welcome');
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
function showAlert(message, className) {
  const div = document.createElement('div');
  div.className = `alert alert-${className} text-center`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('#section-1');
  container.appendChild(div);
}
const welcomBtn = document.getElementById('btnOne');
let visibleTwo = false;
welcomBtn.addEventListener('click', () => {
  const tableOne = document.querySelector('#tableone');
  if (visibleTwo === false) {
    tableOne.classList.remove('d-none');
    tableOne.classList.add('d-block');
    visibleTwo = true;

    const addTaskBtn = document.createElement('button');
    addTaskBtn.innerHTML = '+ Add task';
    addTaskBtn.style.marginTop = '15px';
    addTaskBtn.style.marginLeft = '20%';
    addTaskBtn.id = 'addTask';
    tableOne.appendChild(addTaskBtn);
  } else {
    document.getElementById('addTask').remove();
    tableOne.classList.remove('d-block');
    tableOne.classList.add('d-none');
    visibleTwo = false;
  }
});

document.querySelector('#project-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  const title = document.querySelector('#title').value;
  // const description = document.querySelector('#description').value;
  // const date = document.querySelector('#date').value
  if (title === '') {
    showAlert('Please fill in all fields', 'danger');
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } else {
    const project = new Project(title);
    UI.storeProjectName(project);
    UI.addProjectName()
    // // Instatiate book
    // const count = countBook();
    // const book = new Book(title, author, nbpages, count, false, isbn);
    // // Add book to store
    // storeBook(book);
    // showAlert('Book Added', 'success');
    // clearFields();
    // displayBooks(book);
  }
});