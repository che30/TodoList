import Project from './Project';

export default class UI {
  static delay() {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  static clearFields() {
    document.querySelector('#titletwo').value = '';
    document.getElementById('description').value = '';
    document.querySelector('#date').value = '';
  }

  static getProjectName() {
    let projects;
    if (localStorage.getItem('projects') === null) {
      projects = [];
    } else {
      projects = JSON.parse(localStorage.getItem('projects'));
    }
    return projects;
  }

  static getSelected() {
    let selectedId;
    if (localStorage.getItem('selectedId') === null) {
      selectedId = [0];
    } else {
      selectedId = JSON.parse(localStorage.getItem('selectedId'));
    }
    return selectedId;
  }

  static renderColours(priority) {
    if (priority === 'high') {
      return '#FF33F9';
    } if (priority === 'medium') {
      return ' #334FFF';
    } if (priority === 'low') {
      return '#C70039';
    }
    return false;
  }

  static storeSelected(element) {
    const selectedId = UI.getSelected();
    selectedId.pop();
    selectedId.push(element);
    if (selectedId.length === 0) {
      selectedId.push(selectedId[0]);
    }
    localStorage.setItem('selectedId', JSON.stringify(selectedId));
  }

  static countProject() {
    let currentNumber = Number(localStorage.getItem('lastProjectId'));
    if (currentNumber === null) {
      currentNumber = 1;
    } else {
      currentNumber += 1;
      localStorage.setItem('lastProjectId', currentNumber);
    }
    return currentNumber;
  }

  static storeProjectName(project) {
    const projects = UI.getProjectName();
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static synchro(argument) {
    const getSelectedId = Number(argument);
    const getSelectedProject = UI.getProjectName()[getSelectedId];
    const mainTaskContain = document.createElement('div');
    const sectionOne = document.getElementById('section-1');
    const title = document.getElementById('add-class-header');
    title.innerHTML = getSelectedProject.name;
    sectionOne.innerHTML = '';
    title.innerHTML = getSelectedProject.name;
    sectionOne.appendChild(title);
    getSelectedProject.tasks.forEach(task => {
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
      taskDate.innerHTML = `date: ${task.date}`;

      const taskPriority = document.createElement('p');
      taskPriority.innerHTML = `priority: ${task.priority}`;
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
      taskDescription.innerHTML = `description: ${task.description}`;
      cardContain.style.background = `${UI.renderColours(task.priority)}`;
      title.innerHTML = task.createBy;
      title.classList.add('text-center');
      containAction.appendChild(edit);
      containAction.appendChild(del);
      cardBody.appendChild(taskTitle);
      cardBody.appendChild(taskPriority);
      cardBody.appendChild(taskDescription);
      cardBody.appendChild(taskDate);
      cardBody.appendChild(containAction);
      cardContain.appendChild(cardBody);
      mainTaskContain.appendChild(cardContain);
    });
    sectionOne.appendChild(mainTaskContain);
    sectionOne.classList.remove('d-none');
    sectionOne.classList.add('d-block');

    const plusBtn = document.getElementById('plus');
    plusBtn.style.display = 'block';

    plusBtn.addEventListener('click', () => {
      const taskForm = document.getElementById('task-form');
      taskForm.classList.remove('d-none');
      taskForm.classList.add('d-block');
    });
  }

  static renderDefault() {
    const deefaultElement = UI.getProjectName();
    if (deefaultElement.length === 0) {
      const defaault = new Project('default', 0);
      UI.storeProjectName(defaault);
    }
    const deefaultElementOne = UI.getProjectName();
    const deefault = document.createElement('li');
    deefault.innerHTML = `${deefaultElementOne[0].name}`;
    deefault.id = '0';
    deefault.classList.add('text-white', 'text-center', 'list-unstyled');
    deefault.style.cursor = 'pointer';
    deefault.addEventListener('click', () => {
      UI.storeSelected(0);
      UI.synchro(deefault.id);
    });
    return deefault;
  }

  static addProjectName() {
    const storedProjects = UI.getProjectName();
    const mainContain = document.getElementById('sideNavListchild');
    mainContain.innerHTML = '';
    mainContain.appendChild(UI.renderDefault());
    storedProjects.forEach(project => {
      if (project.number !== 0) {
        const nextElement = document.createElement('li');
        nextElement.innerHTML = `${project.name}<i class="fas ml-5 fa-trash-alt" ></i>`;
        nextElement.classList.add('text-white', 'text-center', 'mt-4', 'list-unstyled');
        nextElement.id = project.number;
        nextElement.style.cursor = 'pointer';
        mainContain.appendChild(nextElement);
        mainContain.addEventListener('click', e => {
          if ((e.target.tagName.toLowerCase() === 'li') && (Number(e.target.id) !== 0)) {
            UI.storeSelected(e.target.id);
            e.target.setAttribute('onclick', UI.synchro(e.target.id));
          }
        });
        nextElement.children[0].setAttribute('onclick', `removeProject(${project.number})`);
      }
    });
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className} text-center`;
    const container = document.getElementById('alert');
    div.appendChild(document.createTextNode(message));
    container.appendChild(div);
  }
}
