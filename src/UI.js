// export default class UI {
//   static getProjectName() {
//     let projects;
//     if (localStorage.getItem('projects') === null) {
//       projects = [];
//     } else {
//       projects = JSON.parse(localStorage.getItem('projects'));
//     }

//     return projects;
//   }

//   static storeProjectName(project) {
//     const projects = UI.getProjectName();
//     projects.push(project);
//     localStorage.setItem('projects', JSON.stringify(projects));
//   }

//   static countProject() {
//     let currentNumber = Number(localStorage.getItem('lastProjectId'));
//     if (currentNumber === null) {
//       currentNumber = 0;
//     } else {
//       currentNumber += 1;
//       localStorage.setItem('lastProjectId', currentNumber);
//     }

//     return currentNumber;
//   }

//   static showAlert(message, className) {
//     const div = document.createElement('div');
//     div.className = `alert alert-${className} text-center`;
//     div.appendChild(document.createTextNode(message));
//     const container = document.querySelector('#section-1');
//     container.appendChild(div);
//   }

//   static getTask() {
//     let tasks;
//     if (localStorage.getItem('tasks') === null) {
//       tasks = [];
//     } else {
//       projects = JSON.parse(localStorage.getItem('tasks'));
//     }

//     return tasks;
//   }

//   static storeTask(task) {
//     const tasks = UI.getTask();
//     tasks.push(task);
//     localStorage.setItem('tasks', JSON.stringify('tasks'));
//   }
//   // static contain (){
//   //   const sectionTwo = document.getElementById('section-1');
//   //   const contaniner = document.createElement('div')
//   //   contaniner.id= 'contain'
//   //   sectionTwo.appendChild(contaniner)
//   //   return sectionTwo
//   // }
//   // static show (){
//   //   const sored = UI.getProjectName()
//   //   const cont = UI.contain()
//   //   const cont1 = document.getElementById('contain')
//   //   cont.innerHTML = ''
//   //    sored.forEach(element => {
//   //   const newDiv = document.createElement('div');
//   //   newDiv.classList.add('text-center','proj');
//   //   newDiv.id ='newDiv'
//   //   newDiv.innerHTML = element.name
    
//   //   const addBtn = document.createElement('div');
//   //   cont1.appendChild(newDiv)
//   //   addBtn.id = element.number
//   //   addBtn.innerHTML = '<span>+<span><span >Add task<span> '
//   //   addBtn.style.fontSize= '1rem'
//   //   addBtn.style.cursor = 'pointer'
//   //   addBtn.classList.add('rounded-circle');
//   //   newDiv.appendChild(addBtn)
//   //   cont.appendChild(cont1)
//   //   });}
//   static addProjectName() {
//     const sideNave = document.getElementById('sideNav');
//     const storedProjects = UI.getProjectName();
//     storedProjects.forEach(project => {
//       const nextElement = document.createElement('div');
//       nextElement.innerHTML = `${project.name}<i class="fas ml-5 fa-trash-alt" ></i>`;
//       nextElement.classList.add('text-white', 'text-center', 'mt-4');
//       nextElement.style.cursor = 'pointer';
//       sideNave.appendChild(nextElement)
//       let visible = false
//       nextElement.addEventListener('click', () => {
//         if (visible===false) {
//         const addBtn = document.getElementById('newDiv')
//         console.log(addBtn.children[0].children[0])
//         addBtn.children[0].children[0].addEventListener('click',()=>{
//           const taskform = document.getElementById('task-form')
        
//           taskform.classList.remove('d-none')
//           taskform.classList.add('d-block')
          
//         })
//         visible=true
//         }else {const proj= document.querySelector('.proj')
//                proj.remove()
//                visible = false
//         }
//       });
//       sideNave.appendChild(nextElement);
//       nextElement.children[0].id = project.number;
//       nextElement.children[0].setAttribute('onclick', `removeProject(${project.number})`);
//     });
//   }
  
// }
// // localStorage.clear()