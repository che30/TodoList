import { compareAsc, format } from 'date-fns'
 import UI from './UI.js'
 import Project from './Project'
 import Task from './Task'
// class UI {
//   static getProjectName() {
//     let projects;
//     if (localStorage.getItem('projects') === null) {
//       projects = [];
//     } else {
//       projects = JSON.parse(localStorage.getItem('projects'));
//     }
//     return projects;
//   }
//   static getSelected() {
//     let selectedId;
//     if (localStorage.getItem('selectedId') === null) {
//       selectedId = [];
//     } else {
//       selectedId = JSON.parse(localStorage.getItem('selectedId'));
//     }
//     return selectedId;
//   }
//   static storeSelected(element) {
//     let selectedId = UI.getSelected();
//     while( selectedId.length > 0) {
//        selectedId.pop();
//   }
//     selectedId.push(element)
//     localStorage.setItem('selectedId', JSON.stringify(selectedId));
//   }
//   static storeProjectName(project) {
//     const projects = UI.getProjectName();
//     projects.push(project);
//     localStorage.setItem('projects', JSON.stringify(projects));
//   }
//   static countProject() {
//     let currentNumber = Number(localStorage.getItem('lastProjectId'));
//     if (currentNumber === null) {
//       currentNumber = 1;
//     } else {
//       currentNumber += 1;
//       localStorage.setItem('lastProjectId', currentNumber);
//     }
//     return currentNumber;
//   }
//   static renderDefault(){
//     const deefaultElement = UI.getProjectName()
//     if (deefaultElement.length===0){
//       const defaault =new Project('default',0)
//       UI.storeProjectName(defaault)
//     }
//     const deefaultElementOne = UI.getProjectName()
//   const sideNave = document.getElementById('sideNavListchild');
//       const deefault =document.createElement('li')
//       deefault.innerHTML = `${deefaultElementOne[0].name}`
//       deefault.classList.add('text-white','text-center','list-unstyled')
//       deefault.style.cursor ='pointer'
//       sideNave.appendChild(deefault)
//   }
//   static showAlert(message, className) {
//     const div = document.createElement('div');
//     div.className = `alert alert-${className} text-center`;
//     div.appendChild(document.createTextNode(message));
//     const container = document.querySelector('#section-1');
//     container.appendChild(div);
//   }
//   static synchro(argument){
//     const sectionOne = document.getElementById('section-1')
//     sectionOne.innerHTML =''
//     sectionOne.classList.remove('d-none')
//     sectionOne.classList.add('d-block')
//     const addHeader = document.getElementById('add-class-header')
//     const title = document.createElement('h4')
//     const adtask = document.createElement('div')
//     const plusBtn = document.createElement('div')
//     plusBtn.innerHTML = '+'
//     plusBtn.style.cursor ='pointer'
//     adtask.innerHTML = 'Add task'
//     adtask.appendChild(plusBtn)
//     title.innerHTML = argument.textContent;
//     plusBtn.addEventListener('click',()=>{
//       const taskForm = document.getElementById('task-form')
//       taskForm.classList.remove('d-none')
//       taskForm.classList.add('d-block')
//     })
//     adtask.appendChild(plusBtn)
//     sectionOne.appendChild(adtask)
//     sectionOne.insertBefore(title,adtask)
//   }
//   static displayAddTask(){
//     const sectionOne = document.getElementById('section-1')
//     sectionOne.classList.remove('d-none')
//     sectionOne.classList.add('d-block')
//     // console.log(typeof argument.textContent)
//     // title.innerHTML =argument.value
//   }
//   static renderSelected(element){
//     const storedProjects = UI.getProjectName();
//     const mainContain= document.getElementById('sideNavListchild')
//     mainContain.innerHTML = ''
//     UI.renderDefault()
//     storedProjects.forEach(project => {
//       if(project.number!=0){
//       const nextElement = document.createElement('li');
//       nextElement.innerHTML = `${project.name}<i class="fas ml-5 fa-trash-alt" ></i>`;
//       nextElement.classList.add('text-white', 'text-center', 'mt-4','list-unstyled');
//       nextElement.id =  project.number
//       // if(parseInt(element[0]===nextElement.id)
//      if(parseInt(element[0])=== parseInt(nextElement.id)){
//       nextElement.classList.add('text-danger')
//      }
//       nextElement.style.cursor = 'pointer';
//       mainContain.appendChild(nextElement)
//       nextElement.children[0].setAttribute('onclick', `removeProject(${project.number})`)
//     }})
// }
// static renderRefresh(){
//   const currentItemId = UI.getSelected()
//   UI.renderSelected(currentItemId)
// }
// static addProjectName() {
//     const storedProjects = UI.getProjectName();
//     const mainContain= document.getElementById('sideNavListchild')
//     mainContain.innerHTML = ''
//     UI.renderDefault()
//     storedProjects.forEach(project => {
//       if(project.number!=0){
//       const nextElement = document.createElement('li');
//       nextElement.innerHTML = `${project.name}<i class="fas ml-5 fa-trash-alt" ></i>`;
//       nextElement.classList.add('text-white', 'text-center', 'mt-4','list-unstyled');
//       nextElement.id =  project.number
//       nextElement.style.cursor = 'pointer';
//       mainContain.appendChild(nextElement)
//       mainContain.addEventListener('click',e =>{
//         if(e.target.tagName.toLowerCase()==='li'){
//           // document.getElementById('section-1').classList.add('d-block')
//           UI.displayAddTask()
//           UI.storeSelected(e.target.id)
//           const selectedId = UI.getSelected()
//           UI.renderSelected(selectedId)
//           const taskForm = document.getElementById('task-form')
//           taskForm.classList.remove('d-block')
//           taskForm.classList.add('d-none')
//           e.target.setAttribute('onclick',UI.synchro(e.target))
//           // renderAddTaskScreen(parseInt(e.target.id))
//         }
//       })
//       nextElement.children[0].setAttribute('onclick', `removeProject(${project.number})`)
//     }})
// }
// }
// function renderAddTaskScreen(id){
//   const stored = UI.getProjectName()
//   stored.forEach((el,index)=>{
//    if(index===id){
//      console.log(index)
//    const sectionOne = document.getElementById('section-1')
//    sectionOne.classList.remove('d-none')
//    sectionOne.classList.add('d-block')
//      sectionOne.innerHTML =''
//      const addHeader = document.getElementById('add-class-header')
//      const title = document.createElement('h4')
//      const adtask = document.createElement('div')
//      const plusBtn = document.createElement('div')
//      plusBtn.innerHTML = '+'
//      plusBtn.style.cursor ='pointer'
//      adtask.innerHTML = 'Add task'
//      adtask.appendChild(plusBtn)
//      title.innerHTML = el.name;
//      adtask.appendChild(plusBtn)
//      sectionOne.appendChild(adtask)
//      sectionOne.insertBefore(title,adtask)
//      return
//    }
//   })
//}
document.getElementById('section-1').classList.add('d-none');
window.removeProject = (projectNumber) => {
  const projects = UI.getProjectName();
  const selectedId =UI.getSelected()
  selectedId.pop()
  UI.storeSelected(selectedId)
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
    window.location.reload();
  }, 3000);
};
document.getElementById('project-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();
  const title = document.querySelector('#title').value;
  if (title === '') {
    UI.showAlert('Please fill in all fields', 'danger');
   UI.delay()
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
   const date = document.querySelector('#date').value
  const priority = document.querySelector('input[name="priority"]:checked').value
  if (title === ''||description===''||date ==''|| priority==undefined) {
    UI.showAlert('Please fill in all fields', 'danger');
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } else {
    const giveMeActiveProject = UI.getSelected()
    const giveStoredProjects = UI.getProjectName()
    if((giveMeActiveProject.length===0)||(giveMeActiveProject[0].length===0)){
    const task = new Task(title, description , date,priority,Date.now().toString(), giveStoredProjects[0].name);
    Task.storeTask(task);
  }else{ 
    const task = new Task(title, description , date,priority,Date.now().toString(), giveStoredProjects[parseInt(giveMeActiveProject[0])].name);
    Task.storeTask(task);
  }
    UI.showAlert('Task added successfuly', 'success');
    UI.delay();
  }
});
//UI.renderDefault();
// const giveMeActiveProject = parseInt(UI.getSelected()[0]);
// renderAddTaskScreen(giveMeActiveProject) ;
document.addEventListener('DOMContentLoaded', 
UI.addProjectName(),
UI.renderRefresh(),
UI.addActiveProjectTask());





