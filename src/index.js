import Project from './Project'
class Task {
  constructor(title, description, date,priority,number) {
    this.title = title;
    this.description = description;
    this.description = date;
    this.priority = priority
    this.number = number
  }
}
class UI {
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className} text-center`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('#section-1');
    container.appendChild(div);
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
    document.getElementById('section-1').innerHTML =''
   
    const storedProjects = UI.getProjectName();
    storedProjects.forEach(project => {
      
      const nextElement = document.createElement('div');
      nextElement.innerHTML = `${project.name}<i class="fas ml-5 fa-trash-alt" ></i>`;
      nextElement.classList.add('text-white', 'text-center', 'mt-4','shared');
      nextElement.id =  project.number
      nextElement.style.cursor = 'pointer';
      container.appendChild(nextElement)
      let visible = false
      const containerTwo = document.getElementById('section-1')
     
     nextElement.addEventListener('click', () => {
       const newEl = document.createElement('div')
       const btn =document.createElement('div')
       btn.style.cursor = "pointer"
       btn.innerHTML = '+'

       newEl.innerHTML = project.name
     
        if (visible===false && newEl) {
         containerTwo.appendChild(newEl)
         newEl.style.marginLeft = "20%"

         visible =true

        }else {
         containerTwo.children[0].remove()
         visible = false;

        }
        newEl.appendChild(btn)
        newEl.addEventListener('click',()=>{
          const taskform = document.getElementById('task-form')
        
          taskform.classList.remove('d-none')
          taskform.classList.add('d-block')
        })
   })
    nextElement.children[0].setAttribute('onclick', `removeProject(${project.number})`)
    })
}}
window.removeProject = (projectNumber) => {
  const projects = UI.getProjectName();
  projects.forEach((project, index) => {
    if (project.number === projectNumber) {
      
      projects.splice(index, 1);
    }
  });

  document.getElementById(projectNumber).remove();
  localStorage.setItem('projects', JSON.stringify(projects));
  UI.addProjectName();
  UI.showAlert('Project Removed', 'success');
  setTimeout(() => {
    // window.location.reload();
  }, 3000);
};
const sideNave = document.getElementById('section-1');
    const container = document.createElement('div')
    sideNav.appendChild(container)
    const deefault =document.createElement('div')
    deefault.innerHTML = 'default'
    deefault.classList.add('text-white','text-center')
    container.appendChild(deefault)
    sideNav.appendChild(container)


document.querySelector('#project-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  const title = document.querySelector('#title').value;
  // const description = document.querySelector('#description').value;
  // const date = document.querySelector('#date').value
  if (title === '') {
    UI.showAlert('Please fill in all fields', 'danger');
    setTimeout(() => {
      // window.location.reload();
    }, 3000);
  } else {
    const project = new Project(title, UI.countProject());
   
     UI.storeProjectName(project);
     UI.addProjectName();
    UI.showAlert('project added successfuly', 'success');
    setTimeout(() => {
      // window.location.reload();
    }, 3000);
  }
});
document.querySelector('#task-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
   const date = document.querySelector('#date').value
  //  const priority = document.getElementById('todo-priority-high')||
  //  document.getElementById('todo-priority-low')||document.getElementById('todo-priority-medium')
   const priority = document.getElementsByName('priority')
   let chech
   function checker(){
   
   }
  
  
  // if(priority[0].checked===false && priority[1].checked ===false && priority[2].checked==false){
  if (title === ''||description===''||date =='' ) {
  
   if(chech.checked===false){
    UI.showAlert('Please fill in all fields', 'danger');
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }} else {
   
    const task = new Task(title, description, date,chech,countProject() );
   
     UI.storeTask(task);
    //  UI.addProjectName();
    UI.showAlert('Task added successfuly', 'success');
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
});
 document.addEventListener('DOMContentLoaded', UI.addProjectName());
//  localStorage.clear()