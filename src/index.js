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
const editForm = document.getElementById('editTaskForm');
const rawDescription = document.getElementById('editDescription');
const rawDate = document.getElementById('Editdate');
const submitBtn = document.getElementById('submitForEdit');
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
const retrieveLocalStorage = () => JSON.parse(localStorage.getItem('projects'));
const resetLocalStorage = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};
const delProject = (id) => {
  const projects = retrieveLocalStorage();
  projects.map((elt, index) => {
    if (elt.number === Number(id)) {
      projects.splice(index, 1);
      resetLocalStorage(projects);
      document.getElementById(id).parentNode.remove();
    }
    return true;
  });
};
// Adding a new Project
submitOne.addEventListener('click', () => {
  const title = document.getElementById('title');
  if (title.value !== '') {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    if (projects.length === 0) {
      const newProject = new Project(title.value, 1);

      newProject.storeProject();
      const mainProjectChild = document.createElement('div');
      const contain = document.createElement('div');
      contain.classList.add('d-flex', 'justify-content-center');
      const projecName = document.createElement('div');
      projecName.innerHTML = title.value;
      projecName.style.cursor = 'pointer';
      projecName.setAttribute('id', '1-p');
      const delIcon = document.createElement('div');
      delIcon.innerHTML = '<span> <i class="fas ml-1 fa-trash-alt" id=1 ></i></span>';
      delIcon.style.cursor = 'pointer';
      contain.appendChild(projecName);
      contain.appendChild(delIcon);
      mainProjectChild.appendChild(contain);
      delIcon.setAttribute('id', 1);
      // delIcon.setAttribute('click',`${delProject(delIcon.id)}`)
      delIcon.addEventListener('click', () => {
        delProject(delIcon.id);
      });
      mainContainer.appendChild(mainProjectChild);
    } else {
      const num = projects[projects.length - 1].number + 1;
      const newProject = new Project(title.value, num);
      newProject.storeProject();

      const mainProjectChild = document.createElement('div');
      const contain = document.createElement('div');
      contain.classList.add('d-flex', 'justify-content-center');
      const projecName = document.createElement('div');
      projecName.innerHTML = title.value;
      projecName.style.cursor = 'pointer';
      projecName.setAttribute('id', `${num}-p`);
      const delIcon = document.createElement('div');
      delIcon.innerHTML = `<span> <i class="fas ml-1 fa-trash-alt" id=${num} ></i></span>`;
      delIcon.style.cursor = 'pointer';
      contain.appendChild(projecName);
      contain.appendChild(delIcon);
      mainProjectChild.appendChild(contain);
      delIcon.setAttribute('id', num);
      delIcon.addEventListener('click', () => {
        delProject(delIcon.id);
      });
      mainContainer.appendChild(mainProjectChild);
    }
  }
});

const rerenderProjects = () => {
  editForm.classList.add('d-none');
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
        delIcon.addEventListener('click', () => {
          delProject(delIcon.id);
        });
        mainContainer.appendChild(mainProjectChild);
      }
    });
  }
};

const progressSec = () => {
  editForm.classList.add('d-none');
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
const renderTaskAfterEdit = () => {
  editForm.classList.add('d-none');
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
        flexContain.classList.add('d-flex', 'align-items-center', 'w-50',
          'mx-auto', 'justify-content-between');
        const holdRadiobtnandDes = document.createElement('div');
        holdRadiobtnandDes.classList.add('d-flex', 'align-items-center');
        const taskDate = document.createElement('div');
        taskDate.innerHTML = task.date;
        const testTask = document.createElement('div');
        const edit = document.createElement('div');
        edit.innerHTML = '<i class="fas fa-edit"></i>';
        edit.style.cursor = 'pointer';
        testTask.innerHTML = task.description;
        testTask.style.cursor = 'pointer';
        testTask.innerHTML = task.description;
        testTask.style.fontSize = '2rem';
        testTask.classList.add('text-center');
        const radio = document.createElement('input');
        radio.setAttribute('type', 'radio');
        holdRadiobtnandDes.appendChild(radio);
        holdRadiobtnandDes.appendChild(testTask);
        flexContain.appendChild(holdRadiobtnandDes);
        flexContain.appendChild(taskDate);
        flexContain.appendChild(edit);
        taskContainer.appendChild(flexContain);
      });
      taskSection.appendChild(taskContainer);
    }
  });
};
const priorityColor = (priority)=>{
  switch(priority){
    case "HIGH": 
    return "HIGH"
    case "MEDIUM":
    return "MEDIUM"
    case "LOW":
    return "LOW"
    default:
    return "LOW"
  }
}
const editTak = (element, date) => {
  let taskPriority = document.getElementById('Taskpriorities');
  taskPriority = taskPriority.options[taskPriority.selectedIndex].value;
  let activeT = getActiveTask();
  let activeP = retrieveLocalStorage();
  const unmodified = activeP;
  rawDescription.value = element;
  rawDate.value = date;
  body.appendChild(editForm);
  plusBtn.style.left = '300px';
  editForm.classList.remove('d-none');
  submitBtn.addEventListener('click', () => {
    if (activeT === 'd' || activeT === null) {
      activeT = 0;
    }

    activeP.forEach(project => {
      if (project.number === Number(activeT)) {
        activeP = project;
      }
    });
    const temp = activeP.tasks;
    temp.forEach((task, index) => {
      if (task.description === element) {
        temp[index].description = rawDescription.value;
        temp[index].date = rawDate.value;
        temp[index].priority = taskPriority;
      }
    });
    unmodified[activeT].tasks = temp;
    resetLocalStorage(unmodified);
    taskSection.childNodes.forEach((node, index) => {
      if (index >= 1) {
        node.innerHTML = '';
      }
    });
    renderTaskAfterEdit();
    editForm.classList.add('d-none');
  });
};
const renderTask = () => {
  editForm.classList.add('d-none');
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
        flexContain.classList.add('d-flex', 'align-items-center', 'w-50',
          'mx-auto', 'justify-content-between',`${priorityColor(task.priority)}`,
          'my-2','px-3');
        flexContain.style.borderRadius = "10px";
        const holdRadiobtnandDes = document.createElement('div');
        holdRadiobtnandDes.classList.add('d-flex', 'align-items-center');
        const taskDate = document.createElement('div');
        taskDate.innerHTML = task.date;
        const testTask = document.createElement('div');
        const edit = document.createElement('div');
        edit.innerHTML = '<i class="fas fa-edit"></i>';
        edit.style.cursor = 'pointer';
        testTask.innerHTML = task.description;
        testTask.style.cursor = 'pointer';
        testTask.innerHTML = task.description;
        testTask.classList.add('text-center');
        const radio = document.createElement('input');
        radio.setAttribute('type', 'radio');
        holdRadiobtnandDes.appendChild(radio);
        holdRadiobtnandDes.appendChild(testTask);
        flexContain.appendChild(holdRadiobtnandDes);
        flexContain.appendChild(taskDate);
        flexContain.appendChild(edit);
        taskContainer.appendChild(flexContain);
        edit.addEventListener('click', () => {
          editTak(testTask.innerHTML, taskDate.innerHTML);
        });
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
  editForm.classList.add('d-none');
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
document.getElementById('cancelTwo').addEventListener('click', () => {
  editForm.classList.remove('d-block');
  editForm.classList.add('d-none');
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
    if (index >= 1) {
      elt.innerHTML = '';
    }
  });
  let tasks = [];
  const taskDiscription = document.getElementById('description');
  const taskDate = document.getElementById('date');
  let taskPriority = document.getElementById('priorities');
  const activeProject = getActiveTask();
  const allprojects = retrieveLocalStorage();
  taskPriority = taskPriority.options[taskPriority.selectedIndex].value;
  if (taskDiscription.value !== ''
   && taskDate.value !== '') {
    console.log('succesful');
    const newTask = new Task(taskDiscription.value,
      taskDate.value,
      taskPriority, activeProject);
    if (activeProject === 'd' || activeProject === 0) {
      tasks = allprojects[0].tasks;
      tasks.push(newTask);
      allprojects[0].tasks = tasks;
      resetLocalStorage(allprojects);
    } else {
      tasks = allprojects[activeProject].tasks;
      tasks.push(newTask);
      allprojects[activeProject].tasks = tasks;
      resetLocalStorage(allprojects);
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
    const retrievedTask = getActiveTask() || 0;
    let storedProjects = retrieveLocalStorage();
    const unmodifiedProjects = storedProjects;

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
        resetLocalStorage(unmodifiedProjects);
        taskSection.childNodes.forEach((node, index) => {
          if (index > 1) {
            node.innerHTML = '';
          }
        });
        renderTask();
      });
    }
  }
});
document.addEventListener('DOMContentLoaded',
  storeDefaultProject(),
  firstRender(),
  rerenderProjects(),
  rerenderDefaultTask(), taskbutton(), renderTask());
