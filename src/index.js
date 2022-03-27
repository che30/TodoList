import Project from './Project';
import Task from './Task';

const arrow = document.getElementById('down-arrow');
// Add default project
const projectsContainer = document.getElementById('projects-container');
projectsContainer.classList.add('w-100');
const mainContainer = document.createElement('div');
mainContainer.classList.add('main__project__container');
const defaultProject = document.createElement('div');
const taskSection = document.getElementById('task-section');
// taskSection.classList.add('task__section','bg-success');
const body = document.querySelector('body');
const submitOne = document.getElementById('submit-one');
const plusBtnSection = document.createElement('section');
const plusBtn = document.createElement('div');
const taskForm = document.getElementById('taskForm');
const cancelbtn = document.getElementById('cancel');
const submitTwo = document.getElementById('submitTwo');
const taskProgressSection = document.createElement('section');
projectsContainer.appendChild(mainContainer);

arrow.addEventListener('click', () => {
  if (arrow.innerHTML === '&gt;') {
    arrow.innerHTML = '&#8964';
    document.querySelector('.main__project__container').classList.remove('d-none');
  } else {
    arrow.innerHTML = '&gt';
    document.querySelector('.main__project__container').classList.add('d-none');
  }
});
const firstRender = () => {
  defaultProject.innerHTML = 'Default';
  defaultProject.style.cursor = 'pointer';
  defaultProject.setAttribute('id', 'default-project');
  mainContainer.appendChild(defaultProject);
};

// Adding a new Project
submitOne.addEventListener('click', () => {
  const title = document.getElementById('title');
  if (title.value !== '') {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    if (projects.length === 0) {
      const newProject = new Project(title.value, 1);

      newProject.storeProject();
      // Appending Newly created Project
      const mainProjectChild = document.createElement('div');
      mainProjectChild.innerHTML = `<span id="1-p">${title.value}</span> `
     + '<span> <i class="fas ml-1 fa-trash-alt" ></i></span>';
      mainProjectChild.style.cursor = 'pointer';
      mainContainer.appendChild(mainProjectChild);
    } else {
      const num = projects[projects.length - 1].number + 1;
      const newProject = new Project(title.value, num);
      newProject.storeProject();
      const mainProjectChild = document.createElement('div');
      mainProjectChild.innerHTML = `<span id=${num}-p>${title.value}</span> `
      + '<span> <i class="fas ml-1 fa-trash-alt" ></i></span>';
      mainProjectChild.style.cursor = 'pointer';
      mainProjectChild.setAttribute('id', `${num}-p`);
      // mainProjectChild.addEventListener('click', ()=>{
      //   delProject(num);
      // })
      // title.value = '';
      mainContainer.appendChild(mainProjectChild);
    }
  }
});
const retrieveLocalStorage = () => JSON.parse(localStorage.getItem('projects'));
const delProject = (id) => {
  const projects = retrieveLocalStorage();
  projects.map((elt, index) => {
    if (elt.number === Number(id)) {
      projects.splice(index, 1);
      localStorage.setItem('projects', JSON.stringify(projects));
      document.getElementById(id).parentNode.remove();
      // const mainc = document.querySelector('.main__project__container').childNodes;
      // mainc.forEach((elt, index) => {
      //   if (index > 0) {
      //     elt.innerHTML = '';
      //   }
      // });
      // rerenderProjects();
    }
    return true;
  });
};

const rerenderProjects = () => {
  const store = retrieveLocalStorage();
  if (store && store.length !== 0) {
    store.forEach(element => {
      if (element.number !== 0) {
        const mainProjectChild = document.createElement('div');
        const contain = document.createElement('div');
        contain.classList.add('d-flex', 'justify-content-center');
        const projecName = document.createElement('div');
        projecName.innerHTML = element.name;
        projecName.style.cursor = 'pointer';
        projecName.setAttribute('id', `${element.number}-p`);
        const delIcon = document.createElement('div');
        delIcon.innerHTML = `<span> <i class="fas ml-1 fa-trash-alt" id=${element.number} ></i></span>`;
        delIcon.style.cursor = 'pointer';
        contain.appendChild(projecName);
        contain.appendChild(delIcon);
        mainProjectChild.appendChild(contain);
        delIcon.setAttribute('id', element.number);
        // delIcon.setAttribute('click',`${delProject(delIcon.id)}`)
        delIcon.addEventListener('click', () => {
          delProject(delIcon.id);
        });
        mainContainer.appendChild(mainProjectChild);
      }
    });
  }
};

const progressSec = () => {
  const taskProgress = document.createElement('div');
  taskProgress.classList.add('text-center');
  taskProgress.setAttribute('id', 'taskProgrossSection');
  taskProgressSection.appendChild(taskProgress);
};
const rerenderDefaultTask = () => {
  taskSection.classList.add('task__section');
  const activeProject = document.createElement('div');
  activeProject.innerHTML = 'Default';
  activeProject.classList.add('text-center');
  taskSection.appendChild(activeProject);
  progressSec();
  body.appendChild(taskSection);
  body.appendChild(taskProgressSection);
};
const taskbutton = () => {
  plusBtnSection.appendChild(plusBtn);
  plusBtn.setAttribute('id', 'plusBtn');
  plusBtn.innerHTML = '+';
  body.appendChild(plusBtnSection);
};
const getActiveTask = () => {
  const activeTask = JSON.parse(localStorage.getItem('active'));
  return activeTask;
};
const renderTask = () => {
  const projects = retrieveLocalStorage();
  let activeProject = getActiveTask();
  if (activeProject === null) {
    activeProject = 0;
  }
  const taskContainer = document.createElement('div');
  projects.forEach(project => {
    if (project.tasks.length !== 0 && project.number === Number(activeProject)) {
      project.tasks.forEach(task => {
        const flexContain = document.createElement('div');
        flexContain.classList.add('d-flex', 'align-items-center', 'bg-info', 'w-50', 'mx-auto');
        const testTask = document.createElement('div');
        testTask.innerHTML = task.description;
        testTask.style.cursor = 'pointer';
        testTask.innerHTML = task.description;
        testTask.style.fontSize = '2rem';
        testTask.classList.add('text-center');
        const radio = document.createElement('input');
        radio.setAttribute('type', 'radio');
        flexContain.appendChild(radio);
        flexContain.appendChild(testTask);
        taskContainer.appendChild(flexContain);
      });
      taskSection.appendChild(taskContainer);
    }
  });
};
const saveActiveProject = (active) => {
  localStorage.setItem('active', JSON.stringify(active));
};
saveActiveProject(null);
projectsContainer.addEventListener('click', (e) => {
  if (e.target.innerHTML !== '&gt;'
   && e.target.innerHTML !== '&#8964'
    && e.target.innerHTML !== '⌄'
    && e.target.innerHTML !== 'projects') {
    taskSection.innerHTML = '';
    plusBtnSection.innerHTML = '';
    taskForm.classList.add('d-none');
    plusBtn.style.left = '630px';
    saveActiveProject(e.target.id.slice(0, 1));
    let taskId;
    if (e.target.id.slice(0, 1) === 'd') {
      saveActiveProject(0);
      taskId = '0-t';
    } else {
      taskId = `${e.target.id.slice(0, 1)}-t`;
    }
    taskProgressSection.innerHTML = '';
    const activeProject = document.createElement('div');
    progressSec();
    activeProject.innerHTML = e.target.innerHTML;
    activeProject.setAttribute('id', `${taskId}`);
    activeProject.classList.add('text-center');
    taskSection.appendChild(activeProject);
    body.appendChild(taskSection);
    renderTask();
  }
  taskbutton();
  body.appendChild(taskProgressSection);
});

plusBtn.addEventListener('click', () => {
  const activeId = getActiveTask();
  body.append(taskForm);
  body.appendChild(plusBtn);
  if (activeId !== null) {
    taskForm.classList.remove('d-none');
    plusBtn.style.left = '320px';
  }
  let activeProjectId = getActiveTask();
  if (activeProjectId === 'd') {
    activeProjectId = 0;
  }
});
cancelbtn.addEventListener('click', () => {
  taskForm.classList.add('d-none');
  plusBtn.style.left = '630px';
});

const storeDefaultProject = () => {
  const store = retrieveLocalStorage();
  if (store === null) {
    const projectZero = new Project('Default', 0);
    projectZero.storeProject();
  }
};

submitTwo.addEventListener('click', () => {
  taskSection.childNodes.forEach((elt, index) => {
    if (index > 0) {
      elt.innerHTML = '';
    }
  });
  let tasks = [];
  const formElements = document.forms[1].getElementsByTagName('input');
  // const taskTitle = formElements[0];
  const taskDiscription = formElements[0];
  const taskDate = formElements[1];
  let taskPriority = document.getElementById('priorities');
  const activeProject = getActiveTask();
  const allprojects = retrieveLocalStorage();
  taskPriority = taskPriority.options[taskPriority.selectedIndex].value;
  if (taskDiscription.value !== ''
   && taskDate.value !== '') {
    const newTask = new Task(taskDiscription.value,
      taskDate.value,
      taskPriority, activeProject);
    if (activeProject === 'd' || activeProject === 0) {
      tasks = allprojects[0].tasks;
      tasks.push(newTask);
      allprojects[0].tasks = tasks;
      localStorage.setItem('projects', JSON.stringify(allprojects));
    } else {
      tasks = allprojects[activeProject].tasks;
      tasks.push(newTask);
      allprojects[activeProject].tasks = tasks;
      localStorage.setItem('projects', JSON.stringify(allprojects));
    }
    taskDiscription.value = '';
    taskDate.value = '';
    renderTask();
  }
});

taskSection.addEventListener('click', (e) => {
  if (e.target.tagName === 'INPUT') {
    const trashContainer = [];
    const allcheckedinputs = document.querySelectorAll('input:checked');
    allcheckedinputs.forEach(elt => {
      trashContainer.push(elt.nextSibling.innerHTML);
    });
    // console.log(trashContainer);
    const retrievedTask = getActiveTask() || 0;
    let storedProjects = retrieveLocalStorage();
    const unmodifiedProjects = storedProjects;
    // let modified = storedProjects;

    storedProjects.forEach(project => {
      if ((project.number === Number(retrievedTask))) {
        storedProjects = project;
      }
    });
    const countActiveProjects = storedProjects.tasks.length - allcheckedinputs.length;
    const message = document.createElement('div');
    const trash = document.createElement('span');
    trash.innerHTML = ' <i class="fas ml-1 fa-trash-alt"></i>';
    trash.classList.add('d-inline-flex');
    trash.style.cursor = 'pointer';
    message.classList.add('text-center');
    message.setAttribute('id', 'msg');
    taskProgressSection.childNodes.forEach((node, index) => {
      if (index > 0) {
        node.innerHTML = '';
      }
    });
    const progrestask = document.getElementById('taskProgrossSection');
    progrestask.innerHTML = '';
    progrestask.appendChild(message);
    progrestask.appendChild(trash);
    if (e.target.type === 'radio') {
      e.target.nextSibling.style.textDecoration = 'line-through';
      const tempTasks = storedProjects.tasks;
      tempTasks.map(elt => {
        trashContainer.map(elt2 => {
          if (elt.description === elt2) {
            const removeIndex = tempTasks.findIndex(item => item.description === elt2);
            tempTasks.splice(removeIndex, 1);
          }
          return true;
        });
        return true;
      });
      storedProjects = tempTasks;
      unmodifiedProjects[retrievedTask].tasks = storedProjects;
      message.innerHTML = `${countActiveProjects} tasks remaining `;
      trash.addEventListener('click', () => {
        localStorage.setItem('projects', JSON.stringify(unmodifiedProjects));
        taskSection.childNodes.forEach((node, index) => {
          if (index > 1) {
            node.innerHTML = '';
          }
        });
        renderTask();
      });

      // }
    }
  }
});
document.addEventListener('DOMContentLoaded',
  storeDefaultProject(),
  firstRender(),
  rerenderProjects(),
  rerenderDefaultTask(), taskbutton(), renderTask());

// window.removeProject = (projectNumber) => {
//   const projects = UI.getProjectName();
//   const selectedId = UI.getSelected();
//   selectedId.pop();
//   localStorage.setItem('selectedId', JSON.stringify(selectedId));
//   projects.forEach((project, index) => {
//     if (project.number === projectNumber) {
//       projects.splice(index, 1);
//     }
//   });
//   document.getElementById(projectNumber).remove();

//   let lastindex;
//   projects.forEach((project, index) => {
//     project.number = index;
//     lastindex = index;
//   });
//   let currentNumber = Number(localStorage.getItem('lastProjectId'));

//   currentNumber = Number(lastindex);
//   localStorage.setItem('lastProjectId', JSON.stringify(currentNumber));
//   localStorage.setItem('projects', JSON.stringify(projects));
//   UI.addProjectName();
//   UI.showAlert('Project Removed', 'success');
//   UI.delay();
// };
// window.removeTask = (taskNumber) => {
//   const tasks = Task.getTask();
//   const projects = UI.getProjectName();
//   projects.forEach(project => {
//     project.tasks.forEach((task, index) => {
//       if (Number(task.now) === taskNumber) {
//         project.tasks.splice(index, 1);
//         localStorage.setItem('projects', JSON.stringify(projects));
//       }
//     });
//   });

//   tasks.forEach((task, index) => {
//     if (Number(task.now) === taskNumber) {
//       tasks.splice(index, 1);
//       document.getElementById(taskNumber).parentNode.parentNode.parentNode.remove();
//       localStorage.setItem('tasks', JSON.stringify(tasks));
//       UI.showAlert('Task Removed', 'success');
//       UI.delay();
//     }
//   });
//   return tasks;
// };
// window.editTask = (taskNumber) => {
//   let toBeEdited;
//   const tasks = Task.getTask();
//   tasks.forEach((task, index) => {
//     if (Number(task.now) === taskNumber) {
//       toBeEdited = task;
//       tasks.splice(index, 1);
//       localStorage.setItem('tasks', JSON.stringify(tasks));
//     }
//   });
//   const projects = UI.getProjectName();
//   projects.forEach(project => {
//     project.tasks.forEach((task, index) => {
//       if (Number(task.now) === taskNumber) {
//         project.tasks.splice(index, 1);
//         localStorage.setItem('projects', JSON.stringify(projects));
//       }
//     });
//   });

//   document.getElementById(taskNumber);
//   document.getElementById('task-form').classList.remove('d-none');
//   document.getElementById('task-form').classList.add('d-block');
//   document.querySelector('#titletwo').value = toBeEdited.title;
//   document.getElementById('description').value = toBeEdited.description;
//   document.querySelector('#date').value = toBeEdited.date;
// };
// const span = document.getElementsByClassName('close')[0];
// span.onclick = function () {
//   document.getElementById('task-form').classList.remove('d-block');
//   document.getElementById('task-form').classList.add('d-none');
// };

// document.getElementById('project-form').addEventListener('submit', (e) => {
//   // Prevent actual submit
//   e.preventDefault();
//   const title = document.querySelector('#title').value;
//   if (title === '') {
//     UI.showAlert('Please fill in all fields', 'danger');
//     UI.delay();
//   } else {
//     const project = new Project(title, UI.countProject());
//     UI.storeProjectName(project);
//     UI.addProjectName();
//     UI.showAlert('project added successfuly', 'success');
//     UI.delay();
//   }
// });
// document.getElementById('task-form').addEventListener('submit', (e) => {
//   // Prevent actual submit
//   e.preventDefault();
//   const title = document.querySelector('#titletwo');
//   const description = document.getElementById('description');
//   const date = document.querySelector('#date');
//   const priority = document.querySelector('input[name="priority"]:checked');
//   if (title.value === '' || description.value === '' || date.value === '' || priority === null) {
//     UI.showAlert('Please fill in all fields', 'danger');
//   } else {
//     const giveMeActiveProject = JSON.parse(localStorage.getItem('selectedId'));

//     const projects = UI.getProjectName();
//     if (Number(giveMeActiveProject[0]) === 0) {
//       const task = new Task(title.value,
//         description.value,
//         date.value,
//         priority.value,
//         Date.now().toString(),
//         projects[0].name);
//       Task.storeTask(task);
//       projects[Number(giveMeActiveProject[0])].tasks.push(task);
//       localStorage.setItem('projects', JSON.stringify(projects));
//       UI.clearFields();
//     } else {
//       const task = new Task(title.value,
//         description.value,
//         date.value,
//         priority.value,
//         Date.now().toString(),
//         projects[Number(giveMeActiveProject[0])].name);

//       Task.storeTask(task);
//       projects[Number(giveMeActiveProject[0])].tasks.push(task);
//       localStorage.setItem('projects', JSON.stringify(projects));
//     }
//     UI.clearFields();
//     UI.delay();
//   }
// });
// const lastActive = Number(UI.getSelected());

// document.addEventListener('DOMContentLoaded', UI.addProjectName(), UI.synchro(lastActive));